import type { Request, Response } from 'express';
import { VolunteerModel } from '@/models/Volunteer';
import {
  fail,
  getBody,
  getErrorMessage,
  getQueryString,
  isAuthorizedAdmin,
  isValidEmail,
  ok,
} from '@/lib/http';
import { shouldRequireRecaptcha, verifyRecaptchaToken } from '@/lib/recaptcha';

const STRING_FIELDS = [
  'institutionName',
  'campusFaculty',
  'departmentProgram',
  'levelYear',
  'chapterLocation',
  'registrationDate',
  'fullName',
  'gender',
  'dateOfBirth',
  'nationality',
  'studentIdNumber',
  'phoneNumber',
  'altPhoneNumber',
  'emailAddress',
  'residentialAddress',
  'emergencyContactName',
  'emergencyContactNumber',
  'relationship',
  'institution',
  'facultySchool',
  'department',
  'programCourse',
  'currentLevelYear',
  'expectedGraduationYear',
  'reasonJoin',
  'otherInterest',
  'otherSkill',
  'leadershipPosition',
  'leadershipDetails',
  'volunteerAvailability',
  'whatsappNumber',
  'facebook',
  'instagram',
  'linkedIn',
  'x',
  'willingLeadership',
  'futureChapterInterest',
  'signature',
  'signedDate',
] as const;

const ARRAY_FIELDS = [
  'interests',
  'skills',
  'preferredRoles',
  'communicationChannels',
  'chapterBuildAreas',
] as const;

const REQUIRED_FIELDS: Array<[string, string]> = [
  ['institutionName', 'Institution name'],
  ['fullName', 'Full name'],
  ['phoneNumber', 'Phone number'],
  ['emailAddress', 'Email address'],
  ['reasonJoin', 'Reason for joining'],
];

const MEMBERSHIP_STATUSES = ['Pending', 'Approved', 'Rejected'] as const;

function buildMembershipId(institutionName: string) {
  const code = institutionName.replace(/[^a-zA-Z0-9]/g, '').slice(0, 4).toUpperCase() || 'GGVF';
  const year = new Date().getFullYear();
  const serial = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `GGVF-${code}-${year}-${serial}`;
}

export async function registerVolunteer(req: Request, res: Response) {
  const body = getBody(req);

  if (shouldRequireRecaptcha()) {
    const captchaToken = typeof body.captchaToken === 'string' ? body.captchaToken : '';
    const verified = await verifyRecaptchaToken(captchaToken);
    if (!verified) {
      return fail(res, 'Security verification failed. Please complete the captcha and try again.', 422);
    }
  }

  // Whitelist input so clients cannot set moderation fields such as membershipStatus.
  const payload: Record<string, unknown> = {};
  for (const field of STRING_FIELDS) {
    const value = body[field];
    if (typeof value === 'string') payload[field] = value.trim();
  }
  for (const field of ARRAY_FIELDS) {
    const value = body[field];
    if (Array.isArray(value)) {
      payload[field] = value.filter((item): item is string => typeof item === 'string').slice(0, 50);
    }
  }
  payload.codeOfConduct = body.codeOfConduct === true;

  for (const [field, label] of REQUIRED_FIELDS) {
    if (!payload[field]) return fail(res, `${label} is required.`, 422);
  }

  if (!isValidEmail(payload.emailAddress)) {
    return fail(res, 'Please provide a valid email address.', 422);
  }

  if (!payload.codeOfConduct) {
    return fail(res, 'You must accept the code of conduct.', 422);
  }

  try {
    const email = String(payload.emailAddress).toLowerCase();
    const existing = await VolunteerModel.findOne({ emailAddress: email }).lean();
    if (existing) {
      return fail(res, 'A registration already exists for this email address.', 409);
    }

    const volunteer = await VolunteerModel.create({
      ...payload,
      emailAddress: email,
      membershipId: buildMembershipId(String(payload.institutionName)),
    });

    return ok(
      res,
      {
        id: volunteer._id,
        membershipId: volunteer.membershipId,
        fullName: volunteer.fullName,
        membershipStatus: volunteer.membershipStatus,
      },
      201
    );
  } catch (error) {
    return fail(res, getErrorMessage(error), 500);
  }
}

export async function listVolunteers(req: Request, res: Response) {
  if (!isAuthorizedAdmin(req)) {
    return fail(res, 'Unauthorized.', 401);
  }

  const page = Math.max(1, Number(getQueryString(req, 'page')) || 1);
  const limit = Math.min(100, Math.max(1, Number(getQueryString(req, 'limit')) || 20));
  const statusParam = getQueryString(req, 'status');
  const status = MEMBERSHIP_STATUSES.find((value) => value === statusParam);

  try {
    const filter = status ? { membershipStatus: status } : {};
    const [items, total] = await Promise.all([
      VolunteerModel.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      VolunteerModel.countDocuments(filter),
    ]);

    return ok(res, { items, total, page, limit });
  } catch (error) {
    return fail(res, getErrorMessage(error), 500);
  }
}

export async function updateVolunteer(req: Request, res: Response) {
  if (!isAuthorizedAdmin(req)) {
    return fail(res, 'Unauthorized.', 401);
  }

  const body = getBody(req);
  const update: Record<string, unknown> = {};

  if (typeof body.membershipStatus === 'string' && MEMBERSHIP_STATUSES.includes(body.membershipStatus as typeof MEMBERSHIP_STATUSES[number])) {
    update.membershipStatus = body.membershipStatus;
  }

  for (const field of ['applicationReceivedBy', 'dateReceived', 'chapterAssigned', 'remarks'] as const) {
    const value = body[field];
    if (typeof value === 'string') update[field] = value.trim();
  }

  if (Object.keys(update).length === 0) {
    return fail(res, 'No valid fields to update.', 422);
  }

  try {
    const volunteer = await VolunteerModel.findByIdAndUpdate(req.params.id, { $set: update }, { returnDocument: 'after' });
    if (!volunteer) return fail(res, 'Volunteer not found.', 404);

    return ok(res, volunteer);
  } catch (error) {
    return fail(res, getErrorMessage(error), 500);
  }
}

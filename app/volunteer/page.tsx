// src/app/volunteer/page.tsx
'use client';
import React, { useMemo, useState } from 'react';
import { User, Mail, Heart, Users2, ShieldCheck, CheckCircle2, BadgeCheck } from 'lucide-react';
import { apiUrl } from '@/lib/apiClient';
import { getRecaptchaSiteKey, shouldRequireRecaptcha } from '@/lib/recaptcha';
import RecaptchaField from '@/components/RecaptchaField';

const interestOptions = [
  'Leadership Development',
  'Community Service',
  'Youth Empowerment',
  'Education Support Programs',
  'Entrepreneurship',
  'Health Awareness Campaigns',
  'Environmental Sustainability',
  'Advocacy & Social Change',
  'Research & Innovation',
  'Fundraising',
  'Event Planning',
  'Mentorship',
  'Media & Communications',
  'Digital Skills Development',
];

const skillOptions = [
  'Public Speaking',
  'Graphic Design',
  'Photography',
  'Videography',
  'Social Media Management',
  'Content Writing',
  'Event Management',
  'Project Management',
  'Leadership',
  'Research',
  'Teaching/Training',
  'ICT/Programming',
  'Fundraising',
  'Accounting/Finance',
];

const roleOptions = [
  'Program Coordinator',
  'Event Volunteer',
  'Media Team',
  'Membership Team',
  'Welfare Team',
  'Community Outreach Team',
  'Fundraising Team',
  'Training Team',
  'Research Team',
  'Any Role',
];

const communicationOptions = ['WhatsApp', 'Email', 'SMS', 'Telegram', 'Phone Call'];
const chapterBuildOptions = [
  'Membership Recruitment',
  'Public Relations',
  'Partnerships',
  'Sponsorship/Fundraising',
  'Training & Capacity Building',
  'Community Outreach',
  'Administration',
  'Monitoring & Evaluation',
  'Digital Platforms',
  'Strategic Planning',
];

function generateMembershipId(chapterName: string) {
  const cleanName = chapterName.replace(/[^a-zA-Z0-9]/g, '').slice(0, 4).toUpperCase();
  const code = cleanName || 'GGVF';
  const year = new Date().getFullYear();
  const hashBase = `${code}-${year}`;
  const hash = hashBase.split('').reduce((total, char) => total + char.charCodeAt(0), 0);
  const serial = String((hash % 900) + 100).padStart(3, '0');
  return `GGVF-${code}-${year}-${serial}`;
}

export default function VolunteerPage() {
  const [membershipId, setMembershipId] = useState(() => generateMembershipId('Bolgatanga Technical University'));
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const recaptchaEnabled = shouldRequireRecaptcha();
  const recaptchaSiteKey = getRecaptchaSiteKey();
  const [formData, setFormData] = useState({
    institutionName: 'Bolgatanga Technical University',
    campusFaculty: '',
    departmentProgram: '',
    levelYear: '',
    chapterLocation: 'Bolgatanga',
    registrationDate: '2026-08-16',
    fullName: '',
    gender: '',
    dateOfBirth: '',
    nationality: '',
    studentIdNumber: '',
    phoneNumber: '',
    altPhoneNumber: '',
    emailAddress: '',
    residentialAddress: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    relationship: '',
    institution: '',
    facultySchool: '',
    department: '',
    programCourse: '',
    currentLevelYear: '',
    expectedGraduationYear: '',
    reasonJoin: '',
    interests: [] as string[],
    otherInterest: '',
    skills: [] as string[],
    otherSkill: '',
    leadershipPosition: '',
    leadershipDetails: '',
    volunteerAvailability: '',
    preferredRoles: [] as string[],
    communicationChannels: [] as string[],
    whatsappNumber: '',
    facebook: '',
    instagram: '',
    linkedIn: '',
    x: '',
    willingLeadership: '',
    chapterBuildAreas: [] as string[],
    futureChapterInterest: '',
    codeOfConduct: false,
    signature: '',
    signedDate: '2026-08-16',
    applicationReceivedBy: '',
    dateReceived: '2026-08-16',
    membershipStatus: 'Pending',
    chapterAssigned: '',
    remarks: '',
  });

  const steps = useMemo(
    () => [
      {
        label: 'Section A',
        title: 'Registration Information',
        icon: Users2,
        content: (
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <Users2 className="w-4 h-4 text-[#e17c22]" />
              <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#141753]">Section A: Registration Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Institution Name</span>
                <input
                  type="text"
                  value={formData.institutionName}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, institutionName: e.target.value }));
                    if (e.target.value.trim()) {
                      setMembershipId((prev) => prev || generateMembershipId(e.target.value));
                    }
                  }}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Campus/Faculty</span>
                <input
                  type="text"
                  value={formData.campusFaculty}
                  onChange={(e) => setFormData((prev) => ({ ...prev, campusFaculty: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Department/Program</span>
                <input
                  type="text"
                  value={formData.departmentProgram}
                  onChange={(e) => setFormData((prev) => ({ ...prev, departmentProgram: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Level/Year</span>
                <input
                  type="text"
                  value={formData.levelYear}
                  onChange={(e) => setFormData((prev) => ({ ...prev, levelYear: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Chapter Location</span>
                <input
                  type="text"
                  value={formData.chapterLocation}
                  onChange={(e) => setFormData((prev) => ({ ...prev, chapterLocation: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Date of Registration</span>
                <input
                  type="date"
                  value={formData.registrationDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, registrationDate: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="md:col-span-2 space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Membership ID (Office Use)</span>
                <input
                  type="text"
                  readOnly
                  value={membershipId}
                  className="w-full rounded-lg border border-slate-200 bg-[#f8f6ef] px-3 py-2.5 text-sm font-semibold text-[#141753]"
                />
              </label>
            </div>
          </div>
        ),
      },
      {
        label: 'Section B',
        title: 'Personal Information',
        icon: User,
        content: (
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <User className="w-4 h-4 text-[#e17c22]" />
              <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#141753]">Section B: Personal Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="md:col-span-2 space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Full Name</span>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <div className="space-y-2 text-xs font-semibold text-[#141753]">
                <span>Gender</span>
                <div className="flex flex-wrap gap-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
                  {['Male', 'Female', 'Prefer not to say'].map((option) => (
                    <label key={option} className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={formData.gender === option}
                        onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Date of Birth</span>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Nationality</span>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => setFormData((prev) => ({ ...prev, nationality: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Student ID Number</span>
                <input
                  type="text"
                  value={formData.studentIdNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, studentIdNumber: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Phone Number</span>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Alternative Phone Number</span>
                <input
                  type="tel"
                  value={formData.altPhoneNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, altPhoneNumber: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Email Address</span>
                <input
                  type="email"
                  value={formData.emailAddress}
                  onChange={(e) => setFormData((prev) => ({ ...prev, emailAddress: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="md:col-span-2 space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Residential Address</span>
                <textarea
                  value={formData.residentialAddress}
                  onChange={(e) => setFormData((prev) => ({ ...prev, residentialAddress: e.target.value }))}
                  className="min-h-[80px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Emergency Contact Name</span>
                <input
                  type="text"
                  value={formData.emergencyContactName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, emergencyContactName: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Emergency Contact Number</span>
                <input
                  type="tel"
                  value={formData.emergencyContactNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, emergencyContactNumber: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753] md:col-span-2">
                <span>Relationship</span>
                <input
                  type="text"
                  value={formData.relationship}
                  onChange={(e) => setFormData((prev) => ({ ...prev, relationship: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>
            </div>
          </div>
        ),
      },
      {
        label: 'Section C',
        title: 'Academic Information',
        icon: ShieldCheck,
        content: (
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <ShieldCheck className="w-4 h-4 text-[#e17c22]" />
              <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#141753]">Section C: Academic Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Institution</span>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData((prev) => ({ ...prev, institution: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Faculty/School</span>
                <input
                  type="text"
                  value={formData.facultySchool}
                  onChange={(e) => setFormData((prev) => ({ ...prev, facultySchool: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Department</span>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Program/Course of Study</span>
                <input
                  type="text"
                  value={formData.programCourse}
                  onChange={(e) => setFormData((prev) => ({ ...prev, programCourse: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Current Level/Year</span>
                <input
                  type="text"
                  value={formData.currentLevelYear}
                  onChange={(e) => setFormData((prev) => ({ ...prev, currentLevelYear: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Expected Graduation Year</span>
                <input
                  type="text"
                  value={formData.expectedGraduationYear}
                  onChange={(e) => setFormData((prev) => ({ ...prev, expectedGraduationYear: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>
            </div>
          </div>
        ),
      },
      {
        label: 'Section D',
        title: 'Membership Interests',
        icon: Heart,
        content: (
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <Heart className="w-4 h-4 text-[#e17c22]" />
              <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#141753]">Section D: Membership Interests</h3>
            </div>

            <label className="block space-y-2 text-xs font-semibold text-[#141753]">
              <span>Why do you want to join GMI Global Vision Foundation?</span>
              <textarea
                value={formData.reasonJoin}
                onChange={(e) => setFormData((prev) => ({ ...prev, reasonJoin: e.target.value }))}
                className="min-h-[90px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
              />
            </label>

            <div className="space-y-2 text-xs font-semibold text-[#141753]">
              <span>Areas of Interest</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
                {interestOptions.map((option) => (
                  <label key={option} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(option)}
                      onChange={() => {
                        setFormData((prev) => {
                          const current = Array.isArray(prev.interests) ? prev.interests : [];
                          const next = current.includes(option)
                            ? current.filter((item: string) => item !== option)
                            : [...current, option];
                          return { ...prev, interests: next };
                        });
                      }}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
              <span>Other</span>
              <input
                type="text"
                value={formData.otherInterest}
                onChange={(e) => setFormData((prev) => ({ ...prev, otherInterest: e.target.value }))}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
              />
            </label>
          </div>
        ),
      },
      {
        label: 'Section E',
        title: 'Skills & Experience',
        icon: BadgeCheck,
        content: (
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <BadgeCheck className="w-4 h-4 text-[#e17c22]" />
              <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#141753]">Section E: Skills and Experience</h3>
            </div>

            <div className="space-y-2 text-xs font-semibold text-[#141753]">
              <span>Professional/Personal Skills</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
                {skillOptions.map((option) => (
                  <label key={option} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(option)}
                      onChange={() => {
                        setFormData((prev) => {
                          const current = Array.isArray(prev.skills) ? prev.skills : [];
                          const next = current.includes(option)
                            ? current.filter((item: string) => item !== option)
                            : [...current, option];
                          return { ...prev, skills: next };
                        });
                      }}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
              <span>Other skill</span>
              <input
                type="text"
                value={formData.otherSkill}
                onChange={(e) => setFormData((prev) => ({ ...prev, otherSkill: e.target.value }))}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
              />
            </label>

            <div className="space-y-2 text-xs font-semibold text-[#141753]">
              <span>Have you held any leadership position before?</span>
              <div className="flex flex-wrap gap-5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
                {['Yes', 'No'].map((option) => (
                  <label key={option} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="leadershipPosition"
                      value={option}
                      checked={formData.leadershipPosition === option}
                      onChange={(e) => setFormData((prev) => ({ ...prev, leadershipPosition: e.target.value }))}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <label className="block space-y-2 text-xs font-semibold text-[#141753]">
              <span>If yes, specify</span>
              <textarea
                value={formData.leadershipDetails}
                onChange={(e) => setFormData((prev) => ({ ...prev, leadershipDetails: e.target.value }))}
                className="min-h-[90px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
              />
            </label>
          </div>
        ),
      },
      {
        label: 'Section F',
        title: 'Volunteer Availability',
        icon: Users2,
        content: (
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <Users2 className="w-4 h-4 text-[#e17c22]" />
              <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#141753]">Section F: Volunteer Availability</h3>
            </div>

            <div className="space-y-2 text-xs font-semibold text-[#141753]">
              <span>How often can you participate in chapter activities?</span>
              <div className="flex flex-wrap gap-5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
                {['Weekly', 'Bi-weekly', 'Monthly', 'Occasionally'].map((option) => (
                  <label key={option} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="volunteerAvailability"
                      value={option}
                      checked={formData.volunteerAvailability === option}
                      onChange={(e) => setFormData((prev) => ({ ...prev, volunteerAvailability: e.target.value }))}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs font-semibold text-[#141753]">
              <span>Preferred Volunteer Roles</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
                {roleOptions.map((option) => (
                  <label key={option} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.preferredRoles.includes(option)}
                      onChange={() => {
                        setFormData((prev) => {
                          const current = Array.isArray(prev.preferredRoles) ? prev.preferredRoles : [];
                          const next = current.includes(option)
                            ? current.filter((item: string) => item !== option)
                            : [...current, option];
                          return { ...prev, preferredRoles: next };
                        });
                      }}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </div>
        ),
      },
      {
        label: 'Section G',
        title: 'Digital Communication',
        icon: Mail,
        content: (
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <Mail className="w-4 h-4 text-[#e17c22]" />
              <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#141753]">Section G: Digital Communication</h3>
            </div>

            <div className="space-y-2 text-xs font-semibold text-[#141753]">
              <span>Preferred Communication Channels</span>
              <div className="flex flex-wrap gap-5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
                {communicationOptions.map((option) => (
                  <label key={option} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={formData.communicationChannels.includes(option)}
                      onChange={() => {
                        setFormData((prev) => {
                          const current = Array.isArray(prev.communicationChannels) ? prev.communicationChannels : [];
                          const next = current.includes(option)
                            ? current.filter((item: string) => item !== option)
                            : [...current, option];
                          return { ...prev, communicationChannels: next };
                        });
                      }}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>WhatsApp Number</span>
                <input
                  type="tel"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, whatsappNumber: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <div className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Social Media Handles</span>
                <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <input type="text" value={formData.facebook} onChange={(e) => setFormData((prev) => ({ ...prev, facebook: e.target.value }))} placeholder="Facebook" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-[#e17c22] focus:outline-none" />
                  <input type="text" value={formData.instagram} onChange={(e) => setFormData((prev) => ({ ...prev, instagram: e.target.value }))} placeholder="Instagram" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-[#e17c22] focus:outline-none" />
                  <input type="text" value={formData.linkedIn} onChange={(e) => setFormData((prev) => ({ ...prev, linkedIn: e.target.value }))} placeholder="LinkedIn" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-[#e17c22] focus:outline-none" />
                  <input type="text" value={formData.x} onChange={(e) => setFormData((prev) => ({ ...prev, x: e.target.value }))} placeholder="X (Twitter)" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-[#e17c22] focus:outline-none" />
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        label: 'Section H',
        title: 'Chapter Development',
        icon: Users2,
        content: (
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <Users2 className="w-4 h-4 text-[#e17c22]" />
              <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#141753]">Section H: Chapter Development Database</h3>
            </div>

            <div className="space-y-2 text-xs font-semibold text-[#141753]">
              <span>Would you be willing to serve in leadership if given training?</span>
              <div className="flex flex-wrap gap-5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
                {['Yes', 'No', 'Maybe'].map((option) => (
                  <label key={option} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="willingLeadership"
                      value={option}
                      checked={formData.willingLeadership === option}
                      onChange={(e) => setFormData((prev) => ({ ...prev, willingLeadership: e.target.value }))}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs font-semibold text-[#141753]">
              <span>Areas you can help build in the chapter</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
                {chapterBuildOptions.map((option) => (
                  <label key={option} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.chapterBuildAreas.includes(option)}
                      onChange={() => {
                        setFormData((prev) => {
                          const current = Array.isArray(prev.chapterBuildAreas) ? prev.chapterBuildAreas : [];
                          const next = current.includes(option)
                            ? current.filter((item: string) => item !== option)
                            : [...current, option];
                          return { ...prev, chapterBuildAreas: next };
                        });
                      }}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs font-semibold text-[#141753]">
              <span>Are you interested in helping establish future GGVF chapters?</span>
              <div className="flex flex-wrap gap-5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
                {['Yes', 'No', 'Maybe'].map((option) => (
                  <label key={option} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="futureChapterInterest"
                      value={option}
                      checked={formData.futureChapterInterest === option}
                      onChange={(e) => setFormData((prev) => ({ ...prev, futureChapterInterest: e.target.value }))}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </div>
        ),
      },
      {
        label: 'Section I',
        title: 'Agreement',
        icon: ShieldCheck,
        content: (
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <ShieldCheck className="w-4 h-4 text-[#e17c22]" />
              <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#141753]">Section I: Code of Conduct Agreement</h3>
            </div>

            <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={formData.codeOfConduct}
                onChange={(e) => setFormData((prev) => ({ ...prev, codeOfConduct: e.target.checked }))}
                className="mt-1"
              />
              I hereby apply to become a member of the GMI Global Vision Foundation. I understand that membership requires adherence to the organization&apos;s values, policies, and code of conduct. I agree to participate responsibly and uphold the vision and mission of the Foundation.
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Applicant&apos;s Signature</span>
                <input
                  type="text"
                  value={formData.signature}
                  onChange={(e) => setFormData((prev) => ({ ...prev, signature: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Date</span>
                <input
                  type="date"
                  value={formData.signedDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, signedDate: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>
            </div>
          </div>
        ),
      },
      {
        label: 'Section J',
        title: 'Office Use Only',
        icon: Heart,
        content: (
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <Heart className="w-4 h-4 text-[#e17c22]" />
              <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#141753]">Section J: Office Use Only</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Application Received By</span>
                <input
                  type="text"
                  value={formData.applicationReceivedBy}
                  onChange={(e) => setFormData((prev) => ({ ...prev, applicationReceivedBy: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Date Received</span>
                <input
                  type="date"
                  value={formData.dateReceived}
                  onChange={(e) => setFormData((prev) => ({ ...prev, dateReceived: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <div className="space-y-2 text-xs font-semibold text-[#141753]">
                <span>Membership Status</span>
                <div className="flex flex-wrap gap-5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
                  {['Approved', 'Pending', 'Declined'].map((option) => (
                    <label key={option} className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="membershipStatus"
                        value={option}
                        checked={formData.membershipStatus === option}
                        onChange={(e) => setFormData((prev) => ({ ...prev, membershipStatus: e.target.value }))}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Membership Number</span>
                <input
                  type="text"
                  value={membershipId}
                  readOnly
                  className="w-full rounded-lg border border-slate-200 bg-[#f8f6ef] px-3 py-2.5 text-sm font-semibold text-[#141753]"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold text-[#141753] md:col-span-2">
                <span>Chapter Assigned</span>
                <input
                  type="text"
                  value={formData.chapterAssigned}
                  onChange={(e) => setFormData((prev) => ({ ...prev, chapterAssigned: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="md:col-span-2 space-y-1.5 text-xs font-semibold text-[#141753]">
                <span>Remarks</span>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => setFormData((prev) => ({ ...prev, remarks: e.target.value }))}
                  className="min-h-[90px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
                />
              </label>
            </div>
          </div>
        ),
      },
    ],
    [formData, membershipId]
  );

  const currentSection = steps[currentStep];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const missingFieldEntries: Array<[keyof typeof formData, { step: number; label: string }]> = [
      ['institutionName', { step: 0, label: 'Institution Name' }],
      ['fullName', { step: 1, label: 'Full Name' }],
      ['phoneNumber', { step: 1, label: 'Phone Number' }],
      ['emailAddress', { step: 1, label: 'Email Address' }],
      ['reasonJoin', { step: 3, label: 'Why do you want to join GMI Global Vision Foundation?' }],
      ['codeOfConduct', { step: 8, label: 'Code of conduct agreement' }],
    ];

    for (const [field, metadata] of missingFieldEntries) {
      const value = formData[field];
      const empty = typeof value === 'boolean' ? !value : !String(value ?? '').trim();
      if (empty) {
        setValidationError(`Please complete the ${metadata.label} field before submitting.`);
        setCurrentStep(metadata.step);
        return;
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      setValidationError('Please enter a valid email address.');
      setCurrentStep(1);
      return;
    }

    if (recaptchaEnabled && !captchaToken) {
      setValidationError('Please complete the security challenge before submitting.');
      return;
    }

    setValidationError('');
    setSubmitting(true);

    try {
      const response = await fetch(apiUrl('/volunteers'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          captchaToken: recaptchaEnabled ? captchaToken : undefined,
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        setValidationError(result.error || 'Registration failed. Please try again.');
        return;
      }

      setMembershipId(result.data.membershipId);
      setSubmitted(true);
    } catch {
      setValidationError('Could not reach the server. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#f5f9f6] pb-16 sm:pb-24">
      <section className="relative overflow-hidden bg-[#141753] py-16 text-center text-white sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#141753] via-slate-900 to-[#141753] opacity-85" />
        <div className="relative z-10 mx-auto max-w-4xl space-y-4 px-4 sm:px-6">
          <span className="text-xs font-bold text-[#e17c22] tracking-widest uppercase block">Membership Registration</span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">GMI Global Vision Foundation</h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Students membership registration framework designed for Bolgatanga Technical University and future chapters.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md sm:p-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#141753] rounded-lg text-white">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#141753]">Membership Registration</h2>
                {/* <p className="text-xs text-slate-500">Build a student database, track engagement, and support chapter growth.</p> */}
              </div>
            </div>

            <div className="flex items-center gap-2 self-start text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              <span>{currentStep + 1}</span>
              <span>/</span>
              <span>{steps.length}</span>
            </div>
          </div>

          <div className="-mx-1 mb-8 flex gap-2 overflow-x-auto px-1 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isDone = index < currentStep;
              const Icon = step.icon;

              return (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => setCurrentStep(index)}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] transition ${
                    isActive
                      ? 'border-[#e17c22] bg-[#fff4eb] text-[#141753]'
                      : isDone
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 bg-slate-50 text-slate-500'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {step.label}
                </button>
              );
            })}
          </div>

          {validationError && (
            <div className="mb-8 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <span className="font-semibold">Required:</span> {validationError}
            </div>
          )}

          {submitted && (
            <div className="mb-8 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
              Membership registration submitted successfully. Your ID is {membershipId}.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-5">{currentSection.content}</div>

            {recaptchaEnabled && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <RecaptchaField siteKey={recaptchaSiteKey} value={captchaToken} onChange={setCaptchaToken} />
              </div>
            )}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between sm:gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
                disabled={currentStep === 0}
                className="w-full rounded-lg border border-slate-200 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#141753] transition hover:border-[#e17c22] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
              >
                Back
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
                  className="w-full rounded bg-[#e17c22] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-orange-600 sm:w-auto"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded bg-[#e17c22] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
              )}
            </div>

          </form>
        </div>
      </section>
    </div>
  );
}
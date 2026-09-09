import type { Request, Response } from 'express';
import { AdminModel } from '@/models/Admin';
import {
  clearAdminSessionCookie,
  createAdminToken,
  getAdminSession,
  setAdminSessionCookie,
  verifyPassword,
} from '@/lib/adminAuth';
import { fail, getBody, getErrorMessage, isValidEmail, ok } from '@/lib/http';

function serializeAdmin(admin: { _id: unknown; email: string; name?: string | null; role?: string }) {
  return {
    id: String(admin._id),
    email: admin.email,
    name: admin.name || 'GMI Admin',
    role: admin.role || 'admin',
  };
}

export async function loginAdmin(req: Request, res: Response) {
  const body = getBody(req);
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!isValidEmail(email) || !password) {
    return fail(res, 'Invalid email or password.', 401);
  }

  try {
    const admin = await AdminModel.findOne({ email }).select('+passwordHash');
    if (!admin || !admin.isActive || !verifyPassword(password, admin.passwordHash)) {
      return fail(res, 'Invalid email or password.', 401);
    }

    admin.lastLoginAt = new Date();
    await admin.save();

    const token = createAdminToken({ id: String(admin._id), email: admin.email });
    setAdminSessionCookie(res, token);

    return ok(res, { admin: serializeAdmin(admin), token });
  } catch (error) {
    return fail(res, getErrorMessage(error), 500);
  }
}

export function logoutAdmin(_req: Request, res: Response) {
  clearAdminSessionCookie(res);
  return ok(res, { loggedOut: true });
}

export async function getCurrentAdmin(req: Request, res: Response) {
  const session = getAdminSession(req);
  if (!session) return fail(res, 'Unauthorized.', 401);

  try {
    const admin = await AdminModel.findById(session.sub).lean();
    if (!admin || !admin.isActive) return fail(res, 'Unauthorized.', 401);

    return ok(res, { admin: serializeAdmin(admin) });
  } catch (error) {
    return fail(res, getErrorMessage(error), 500);
  }
}

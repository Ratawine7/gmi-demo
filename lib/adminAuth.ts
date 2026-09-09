import crypto from 'crypto';
import type { Request, Response } from 'express';

const TOKEN_COOKIE_NAME = 'gmi_admin_session';
const TOKEN_TTL_SECONDS = 60 * 60 * 8;

type AdminTokenPayload = {
  sub: string;
  email: string;
  role: 'admin';
  iat: number;
  exp: number;
};

function base64UrlEncode(value: Buffer | string) {
  return Buffer.from(value).toString('base64url');
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function getJwtSecret() {
  const secret = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_API_KEY || '';
  const isPlaceholder = secret === 'change-me' || secret.startsWith('replace-with-');
  return secret.length >= 32 && !isPlaceholder ? secret : '';
}

function sign(value: string) {
  const secret = getJwtSecret();
  if (!secret) {
    throw new Error('ADMIN_JWT_SECRET must be set to a strong secret.');
  }

  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

function timingSafeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('base64url');
  const key = crypto.scryptSync(password, salt, 64).toString('base64url');
  return `scrypt$${salt}$${key}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [scheme, salt, key] = storedHash.split('$');
  if (scheme !== 'scrypt' || !salt || !key) return false;

  const hashed = crypto.scryptSync(password, salt, 64).toString('base64url');
  return timingSafeEqual(hashed, key);
}

export function createAdminToken(admin: { id: string; email: string }) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = base64UrlEncode(
    JSON.stringify({ sub: admin.id, email: admin.email, role: 'admin', iat: now, exp: now + TOKEN_TTL_SECONDS })
  );
  const signature = sign(`${header}.${payload}`);

  return `${header}.${payload}.${signature}`;
}

export function verifyAdminToken(token: string): AdminTokenPayload | null {
  const [header, payload, signature] = token.split('.');
  if (!header || !payload || !signature) return null;

  let expectedSignature = '';
  try {
    expectedSignature = sign(`${header}.${payload}`);
  } catch {
    return null;
  }
  if (!timingSafeEqual(signature, expectedSignature)) return null;

  try {
    const decoded = JSON.parse(base64UrlDecode(payload)) as AdminTokenPayload;
    if (decoded.role !== 'admin') return null;
    if (!decoded.sub || !decoded.email || !decoded.exp) return null;
    if (decoded.exp < Math.floor(Date.now() / 1000)) return null;
    return decoded;
  } catch {
    return null;
  }
}

export function getAdminSession(req: Request) {
  const authHeader = req.get('authorization');
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : undefined;
  const cookieToken = (req as Request & { cookies?: Record<string, string> }).cookies?.[TOKEN_COOKIE_NAME];
  const token = bearerToken || cookieToken;

  if (!token) return null;
  return verifyAdminToken(token);
}

export function setAdminSessionCookie(res: Response, token: string) {
  res.cookie(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: TOKEN_TTL_SECONDS * 1000,
    path: '/',
  });
}

export function clearAdminSessionCookie(res: Response) {
  res.clearCookie(TOKEN_COOKIE_NAME, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
}

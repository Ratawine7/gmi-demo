export function hasRecaptchaConfig() {
  return Boolean(process.env.RECAPTCHA_SECRET_KEY);
}

export function shouldRequireRecaptcha() {
  return hasRecaptchaConfig() && (process.env.NODE_ENV === 'production' || process.env.RECAPTCHA_ENABLE_IN_DEV === 'true');
}

export function getRecaptchaSiteKey() {
  return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
}

export async function verifyRecaptchaToken(token: unknown) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const responseToken = typeof token === 'string' ? token.trim() : '';

  if (!secretKey || !responseToken) {
    return false;
  }

  try {
    const verification = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: secretKey, response: responseToken }).toString(),
    });

    if (!verification.ok) {
      return false;
    }

    const result = (await verification.json()) as { success?: boolean };
    return Boolean(result.success);
  } catch {
    return false;
  }
}

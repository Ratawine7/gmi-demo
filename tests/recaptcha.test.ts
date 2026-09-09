import test from 'node:test';
import assert from 'node:assert/strict';

import { shouldRequireRecaptcha } from '../lib/recaptcha';

test('captcha is disabled when no secret is configured', () => {
  const previousEnv = process.env.NODE_ENV;
  const previousKey = process.env.RECAPTCHA_SECRET_KEY;

  delete process.env.RECAPTCHA_SECRET_KEY;
  process.env.NODE_ENV = 'development';

  try {
    assert.equal(shouldRequireRecaptcha(), false);
  } finally {
    if (previousKey === undefined) delete process.env.RECAPTCHA_SECRET_KEY;
    else process.env.RECAPTCHA_SECRET_KEY = previousKey;

    if (previousEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousEnv;
  }
});

test('captcha is required when a secret key is configured in production', () => {
  const previousEnv = process.env.NODE_ENV;
  const previousKey = process.env.RECAPTCHA_SECRET_KEY;

  process.env.RECAPTCHA_SECRET_KEY = 'test_secret_key_1234567890';
  process.env.NODE_ENV = 'production';

  try {
    assert.equal(shouldRequireRecaptcha(), true);
  } finally {
    if (previousKey === undefined) delete process.env.RECAPTCHA_SECRET_KEY;
    else process.env.RECAPTCHA_SECRET_KEY = previousKey;

    if (previousEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousEnv;
  }
});

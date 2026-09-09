import type { Request, Response } from 'express';
import { SubscriberModel } from '@/models/Subscriber';
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

const SUBSCRIBER_STATUSES = ['active', 'unsubscribed'] as const;
type SubscriberStatus = typeof SUBSCRIBER_STATUSES[number];

function isSubscriberStatus(value: string | undefined): value is SubscriberStatus {
  return SUBSCRIBER_STATUSES.some((status) => status === value);
}

export async function subscribe(req: Request, res: Response) {
  const body = getBody(req);

  if (shouldRequireRecaptcha()) {
    const captchaToken = typeof body.captchaToken === 'string' ? body.captchaToken : '';
    const verified = await verifyRecaptchaToken(captchaToken);
    if (!verified) {
      return fail(res, 'Security verification failed. Please complete the captcha and try again.', 422);
    }
  }

  if (!isValidEmail(body.email)) {
    return fail(res, 'Please provide a valid email address.', 422);
  }

  const email = body.email.trim().toLowerCase();
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 120) : undefined;
  const source = typeof body.source === 'string' ? body.source.trim().slice(0, 60) : 'website';

  try {
    const subscriber = await SubscriberModel.findOneAndUpdate(
      { email },
      {
        $set: { status: 'active', unsubscribedAt: null, ...(name ? { name } : {}) },
        $setOnInsert: { email, source },
      },
      { returnDocument: 'after', upsert: true }
    );

    return ok(res, { email: subscriber.email, status: subscriber.status }, 201);
  } catch (error) {
    return fail(res, getErrorMessage(error), 500);
  }
}

export async function unsubscribe(req: Request, res: Response) {
  const rawEmail = getQueryString(req, 'email');

  if (!isValidEmail(rawEmail)) {
    return fail(res, 'Please provide a valid email address.', 422);
  }

  try {
    const updated = await SubscriberModel.findOneAndUpdate(
      { email: rawEmail.trim().toLowerCase() },
      { $set: { status: 'unsubscribed', unsubscribedAt: new Date() } },
      { returnDocument: 'after' }
    );

    if (!updated) return fail(res, 'Subscription not found.', 404);

    return ok(res, { email: updated.email, status: updated.status });
  } catch (error) {
    return fail(res, getErrorMessage(error), 500);
  }
}

export async function listSubscribers(req: Request, res: Response) {
  if (!isAuthorizedAdmin(req)) {
    return fail(res, 'Unauthorized.', 401);
  }

  try {
    const status = getQueryString(req, 'status');
    const filter: { status?: SubscriberStatus } = isSubscriberStatus(status) ? { status } : {};
    const items = await SubscriberModel.find(filter).sort({ createdAt: -1 }).lean();
    return ok(res, { items, total: items.length });
  } catch (error) {
    return fail(res, getErrorMessage(error), 500);
  }
}

export async function updateSubscriber(req: Request, res: Response) {
  if (!isAuthorizedAdmin(req)) {
    return fail(res, 'Unauthorized.', 401);
  }

  const body = getBody(req);
  const update: Record<string, unknown> = {};

  if (typeof body.name === 'string') update.name = body.name.trim().slice(0, 120);
  if (typeof body.source === 'string') update.source = body.source.trim().slice(0, 60) || 'website';
  if (body.status === 'active') {
    update.status = 'active';
    update.unsubscribedAt = null;
  }
  if (body.status === 'unsubscribed') {
    update.status = 'unsubscribed';
    update.unsubscribedAt = new Date();
  }

  if (Object.keys(update).length === 0) {
    return fail(res, 'No valid fields to update.', 422);
  }

  try {
    const subscriber = await SubscriberModel.findByIdAndUpdate(req.params.id, { $set: update }, { returnDocument: 'after' });
    if (!subscriber) return fail(res, 'Subscriber not found.', 404);

    return ok(res, subscriber);
  } catch (error) {
    return fail(res, getErrorMessage(error), 500);
  }
}

export async function deleteSubscriber(req: Request, res: Response) {
  if (!isAuthorizedAdmin(req)) {
    return fail(res, 'Unauthorized.', 401);
  }

  try {
    const subscriber = await SubscriberModel.findByIdAndDelete(req.params.id);
    if (!subscriber) return fail(res, 'Subscriber not found.', 404);

    return ok(res, { id: String(subscriber._id), deleted: true });
  } catch (error) {
    return fail(res, getErrorMessage(error), 500);
  }
}

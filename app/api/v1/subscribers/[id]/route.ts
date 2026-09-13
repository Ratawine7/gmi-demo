import { makeNextRouteHandler } from '@/lib/nextApiCompat';
import { deleteSubscriber, updateSubscriber } from '@/controllers/subscriber';

export const PATCH = makeNextRouteHandler(updateSubscriber);
export const DELETE = makeNextRouteHandler(deleteSubscriber);
import { makeNextRouteHandler } from '@/lib/nextApiCompat';
import { listSubscribers, subscribe, unsubscribe } from '@/controllers/subscriber';

export const GET = makeNextRouteHandler(listSubscribers);
export const POST = makeNextRouteHandler(subscribe);
export const DELETE = makeNextRouteHandler(unsubscribe);

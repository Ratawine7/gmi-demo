import { makeNextRouteHandler } from '@/lib/nextApiCompat';
import { subscribe } from '@/controllers/subscriber';

export const POST = makeNextRouteHandler(subscribe);

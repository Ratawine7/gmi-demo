import { makeNextRouteHandler } from '@/lib/nextApiCompat';
import { logoutAdmin } from '@/controllers/admin';

export const POST = makeNextRouteHandler(logoutAdmin);

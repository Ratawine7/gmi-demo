import { makeNextRouteHandler } from '@/lib/nextApiCompat';
import { getCurrentAdmin } from '@/controllers/admin';

export const GET = makeNextRouteHandler(getCurrentAdmin);

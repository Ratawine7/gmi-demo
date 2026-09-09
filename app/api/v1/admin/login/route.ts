import { makeNextRouteHandler } from '@/lib/nextApiCompat';
import { loginAdmin } from '@/controllers/admin';

export const POST = makeNextRouteHandler(loginAdmin);

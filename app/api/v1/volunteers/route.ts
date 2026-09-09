import { makeNextRouteHandler } from '@/lib/nextApiCompat';
import { registerVolunteer } from '@/controllers/volunteer';

export const POST = makeNextRouteHandler(registerVolunteer);

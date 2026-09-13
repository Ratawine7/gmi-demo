import { makeNextRouteHandler } from '@/lib/nextApiCompat';
import { listVolunteers, registerVolunteer } from '@/controllers/volunteer';

export const GET = makeNextRouteHandler(listVolunteers);
export const POST = makeNextRouteHandler(registerVolunteer);

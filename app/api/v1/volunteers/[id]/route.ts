import { makeNextRouteHandler } from '@/lib/nextApiCompat';
import { updateVolunteer } from '@/controllers/volunteer';

export const PATCH = makeNextRouteHandler(updateVolunteer);
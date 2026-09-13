import { makeNextRouteHandler } from '@/lib/nextApiCompat';
import { deleteNewsPost, getNewsPost, updateNewsPost } from '@/controllers/news';

export const GET = makeNextRouteHandler(getNewsPost);
export const PATCH = makeNextRouteHandler(updateNewsPost);
export const DELETE = makeNextRouteHandler(deleteNewsPost);
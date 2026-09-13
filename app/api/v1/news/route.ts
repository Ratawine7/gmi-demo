import { makeNextRouteHandler } from '@/lib/nextApiCompat';
import { createNewsPost, listNewsPosts } from '@/controllers/news';

export const GET = makeNextRouteHandler(listNewsPosts);
export const POST = makeNextRouteHandler(createNewsPost);
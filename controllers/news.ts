import type { Request, Response } from 'express';
import { NewsPostModel } from '@/models/NewsPost';
import {
  fail,
  getBody,
  getErrorMessage,
  getQueryString,
  isAuthorizedAdmin,
  ok,
  slugify,
} from '@/lib/http';

const TEXT_FIELDS = ['title', 'excerpt', 'content', 'image', 'author', 'category'] as const;

function normalizeTags(value: unknown) {
  return Array.isArray(value)
    ? value.filter((tag): tag is string => typeof tag === 'string').slice(0, 20)
    : [];
}

export async function listNewsPosts(req: Request, res: Response) {
  const page = Math.max(1, Number(getQueryString(req, 'page')) || 1);
  const limit = Math.min(50, Math.max(1, Number(getQueryString(req, 'limit')) || 12));
  const category = getQueryString(req, 'category');
  const wantsDrafts = getQueryString(req, 'status') === 'draft';

  // Drafts are only visible to admins.
  if (wantsDrafts && !isAuthorizedAdmin(req)) {
    return fail(res, 'Unauthorized.', 401);
  }

  try {
    const filter: Record<string, unknown> = wantsDrafts
      ? { isDraft: true }
      : { isDraft: false, published: true };
    if (category) filter.category = category;

    const [items, total] = await Promise.all([
      NewsPostModel.find(filter)
        .sort({ publishedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      NewsPostModel.countDocuments(filter),
    ]);

    return ok(res, { items, total, page, limit });
  } catch (error) {
    return fail(res, getErrorMessage(error), 500);
  }
}

export async function createNewsPost(req: Request, res: Response) {
  if (!isAuthorizedAdmin(req)) {
    return fail(res, 'Unauthorized.', 401);
  }

  const body = getBody(req);
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const excerpt = typeof body.excerpt === 'string' ? body.excerpt.trim() : '';
  const content = typeof body.content === 'string' ? body.content.trim() : '';

  if (!title) return fail(res, 'Title is required.', 422);
  if (!excerpt) return fail(res, 'Excerpt is required.', 422);
  if (!content) return fail(res, 'Content is required.', 422);

  const slug = slugify(typeof body.slug === 'string' && body.slug.trim() ? body.slug : title);
  if (!slug) return fail(res, 'Unable to derive a slug from the title.', 422);

  try {
    if (await NewsPostModel.exists({ slug })) {
      return fail(res, 'A post with this slug already exists.', 409);
    }

    const isDraft = body.isDraft === true;

    const post = await NewsPostModel.create({
      slug,
      title,
      excerpt,
      content,
      image: typeof body.image === 'string' && body.image.trim() ? body.image.trim() : undefined,
      author: typeof body.author === 'string' && body.author.trim() ? body.author.trim() : undefined,
      category: typeof body.category === 'string' && body.category.trim() ? body.category.trim() : undefined,
      tags: normalizeTags(body.tags),
      isDraft,
      published: isDraft ? false : body.published !== false,
      publishedAt: typeof body.publishedAt === 'string' ? new Date(body.publishedAt) : new Date(),
    });

    return ok(res, post, 201);
  } catch (error) {
    return fail(res, getErrorMessage(error), 500);
  }
}

export async function getNewsPost(req: Request, res: Response) {
  const slug = String(req.params.slug || '').toLowerCase();

  try {
    // Admins can preview drafts; everyone else only sees published posts.
    const filter = isAuthorizedAdmin(req) ? { slug } : { slug, isDraft: false, published: true };

    const post = await NewsPostModel.findOne(filter).lean();
    if (!post) return fail(res, 'Post not found.', 404);

    return ok(res, post);
  } catch (error) {
    return fail(res, getErrorMessage(error), 500);
  }
}

export async function updateNewsPost(req: Request, res: Response) {
  if (!isAuthorizedAdmin(req)) {
    return fail(res, 'Unauthorized.', 401);
  }

  const slug = String(req.params.slug || '').toLowerCase();
  const body = getBody(req);

  const update: Record<string, unknown> = {};
  for (const field of TEXT_FIELDS) {
    const value = body[field];
    if (typeof value === 'string' && value.trim()) update[field] = value.trim();
  }
  if (Array.isArray(body.tags)) update.tags = normalizeTags(body.tags);
  if (typeof body.published === 'boolean') update.published = body.published;
  if (typeof body.isDraft === 'boolean') {
    update.isDraft = body.isDraft;
    // Publishing a draft clears the draft flag and stamps the publish date.
    if (body.isDraft) {
      update.published = false;
    } else if (typeof body.published !== 'boolean') {
      update.published = true;
      update.publishedAt = new Date();
    }
  }
  if (typeof body.slug === 'string' && body.slug.trim()) update.slug = slugify(body.slug);

  if (Object.keys(update).length === 0) {
    return fail(res, 'No valid fields to update.', 422);
  }

  try {
    const post = await NewsPostModel.findOneAndUpdate({ slug }, { $set: update }, { returnDocument: 'after' });
    if (!post) return fail(res, 'Post not found.', 404);

    return ok(res, post);
  } catch (error) {
    return fail(res, getErrorMessage(error), 500);
  }
}

export async function deleteNewsPost(req: Request, res: Response) {
  if (!isAuthorizedAdmin(req)) {
    return fail(res, 'Unauthorized.', 401);
  }

  const slug = String(req.params.slug || '').toLowerCase();

  try {
    const post = await NewsPostModel.findOneAndDelete({ slug });
    if (!post) return fail(res, 'Post not found.', 404);

    return ok(res, { slug: post.slug, deleted: true });
  } catch (error) {
    return fail(res, getErrorMessage(error), 500);
  }
}

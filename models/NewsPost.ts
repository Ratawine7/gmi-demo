import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const NewsPostSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    image: { type: String, trim: true, default: '/hero-bg.jpg' },
    author: { type: String, trim: true, default: 'GMI Media' },
    category: { type: String, trim: true, default: 'General' },
    tags: { type: [String], default: [] },
    isDraft: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    publishedAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

NewsPostSchema.index({ publishedAt: -1 });
NewsPostSchema.index({ isDraft: 1, published: 1 });

export type NewsPost = InferSchemaType<typeof NewsPostSchema>;

export const NewsPostModel: Model<NewsPost> =
  (mongoose.models.NewsPost as Model<NewsPost>) ||
  mongoose.model<NewsPost>('NewsPost', NewsPostSchema);

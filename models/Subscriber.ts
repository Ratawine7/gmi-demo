import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const SubscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    name: { type: String, trim: true },
    source: { type: String, trim: true, default: 'website' },
    status: {
      type: String,
      enum: ['active', 'unsubscribed'],
      default: 'active',
    },
    unsubscribedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export type Subscriber = InferSchemaType<typeof SubscriberSchema>;

export const SubscriberModel: Model<Subscriber> =
  (mongoose.models.Subscriber as Model<Subscriber>) ||
  mongoose.model<Subscriber>('Subscriber', SubscriberSchema);

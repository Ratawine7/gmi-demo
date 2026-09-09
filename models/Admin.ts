import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const AdminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    name: { type: String, trim: true, default: 'GMI Admin' },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin'], default: 'admin' },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export type Admin = InferSchemaType<typeof AdminSchema>;

export const AdminModel: Model<Admin> =
  (mongoose.models.Admin as Model<Admin>) || mongoose.model<Admin>('Admin', AdminSchema);

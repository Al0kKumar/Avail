import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: String,
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    publicSlug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    email: { type: String, unique: true },
    timezone: { type: String, default: 'UTC' },
  },
  { timestamps: true }
);

export const User = model('User', userSchema);

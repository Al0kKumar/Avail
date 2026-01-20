import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    timezone: { type: String, default: 'UTC' },
  },
  { timestamps: true }
);

export const User = model('User', userSchema);

import { Schema, model } from 'mongoose';

const availabilitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    dayOfWeek: Number, // 0–6
    startTime: String, // "10:00"
    endTime: String,   // "17:00"
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Availability = model('Availability', availabilitySchema);

import { Schema, model } from 'mongoose';

const bookingSchema = new Schema(
  {
    hostUserId: { type: Schema.Types.ObjectId, ref: 'User' },
    guestName: String,
    guestEmail: String,
    startTimeUTC: Date,
    endTimeUTC: Date,
    guestTimezone: String,
    meetingLink: String,
    status: { type: String, default: 'confirmed' },
  },
  { timestamps: true }
);

bookingSchema.index({ hostUserId: 1, startTimeUTC: 1 });

export const Booking = model('Booking', bookingSchema);

import { z } from 'zod';

export const bookingSchema = z.object({
  body: z.object({
    hostUserId: z.string(),
    guestName: z.string().min(1),
    guestEmail: z.string().email(),
    startTimeUTC: z.string().datetime(),
    endTimeUTC: z.string().datetime(),
    guestTimezone: z.string(),
    meetingLink: z.string().optional(),
  }),
});

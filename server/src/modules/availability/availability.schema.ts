import { z } from 'zod';

export const availabilitySchema = z.object({
  body: z.object({
    userId: z.string(),
    dayOfWeek: z.number().min(0).max(6),
    startTime: z.string().regex(/^\d{2}:\d{2}$/), // HH:mm
    endTime: z.string().regex(/^\d{2}:\d{2}$/),
  }),
});

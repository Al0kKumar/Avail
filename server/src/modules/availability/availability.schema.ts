import { z } from 'zod';

export const availabilitySchema = z.object({
  rules: z.array(
    z.object({
      dayOfWeek: z.number().min(0).max(6),
      startTime: z.string(),
      endTime: z.string(),
      isActive: z.boolean().optional(),
    })
  ),
});

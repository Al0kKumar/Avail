import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('4000'),
  MONGO_URI: z.string().min(1),
});

export const env = envSchema.parse(process.env);

import jwt, { type SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms';
import { env } from './env.js';

const signOptions: SignOptions = {
  expiresIn: env.JWT_EXPIRES_IN as StringValue,
};

export const signJwt = (payload: object): string => {
  return jwt.sign(payload, env.JWT_SECRET, signOptions);
};

export const verifyJwt = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET);
};

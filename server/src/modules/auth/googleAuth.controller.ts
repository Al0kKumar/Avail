import { OAuth2Client } from 'google-auth-library';
import type { Request, Response } from 'express';

import { User } from '../users/user.model.js';
import { signJwt } from '../../config/jwt.js';
import { env } from '../../config/env.js';

const client = new OAuth2Client(env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req: Request, res: Response) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: 'idToken is required' });
  }

  const ticket = await client.verifyIdToken({
    idToken,
    audience: env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload?.email || !payload.name) {
    return res.status(401).json({ message: 'Invalid Google token' });
  }

  let user = await User.findOne({ email: payload.email });

  if (!user) {
    const baseUsername = payload.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-');

    user = await User.create({
      email: payload.email,
      name: payload.name,
      username: baseUsername,
      publicSlug: `${baseUsername}-${Date.now()}`,
      timezone: 'UTC',
    });
  }

  const token = signJwt({
    userId: user._id,
    email: user.email,
  });

  res.json({ token });
};

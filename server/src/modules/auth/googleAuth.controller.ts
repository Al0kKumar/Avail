import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import type { Request, Response } from 'express';

import { User } from '../users/user.model.js';
import { signJwt } from '../../config/jwt.js';
import { env } from '../../config/env.js';

const client = new OAuth2Client(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET
);

export const googleAuthWithCode = async (
  req: Request,
  res: Response
) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: 'Code is required' });
  }

  // 1️⃣ Exchange code for tokens
  const tokenRes = await axios.post(
    'https://oauth2.googleapis.com/token',
    {
      code,
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: 'postmessage',
      grant_type: 'authorization_code',
    }
  );

  const { id_token } = tokenRes.data;

  // 2️⃣ Verify ID token
  const ticket = await client.verifyIdToken({
    idToken: id_token,
    audience: env.GOOGLE_CLIENT_ID, // ✅ now guaranteed string
  });

  const payload = ticket.getPayload();

  if (!payload?.email || !payload.name) {
    return res.status(401).json({ message: 'Invalid Google token' });
  }

  // 3️⃣ Find or create user
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

  // 4️⃣ Issue JWT
  const token = signJwt({
    userId: user._id,
    email: user.email,
  });

  res.json({ token });
};

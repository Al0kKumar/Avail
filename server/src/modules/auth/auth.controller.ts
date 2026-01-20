import type { Request, Response } from 'express';
import { User } from '../users/user.model.js';
import { asyncHandler } from '../../common/asyncHandler.js';
import { verifyGoogleToken } from './auth.service.js';
import { signJwt } from '../../config/jwt.js';

export const googleAuth = asyncHandler(
  async (req: Request, res: Response) => {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: 'idToken is required' });
    }

    // 1️⃣ Verify Google token
    const { email, name } = await verifyGoogleToken(idToken);

    // 2️⃣ Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name,
        timezone: 'UTC',
      });
    }

    // 3️⃣ Issue YOUR JWT
    const token = signJwt({
      userId: user._id,
      email: user.email,
    });

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  }
);

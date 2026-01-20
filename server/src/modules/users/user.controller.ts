import { User } from './user.model.js';
import { asyncHandler } from '../../common/asyncHandler.js';
import type { Request, Response } from 'express';

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

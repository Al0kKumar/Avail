import { Availability } from './availability.model.js';
import { asyncHandler } from '../../common/asyncHandler.js';
import type { Request, Response } from 'express';

export const setAvailability = asyncHandler(async (req: Request, res: Response) => {
  const availability = await Availability.create(req.body);
  res.status(201).json(availability);
});

import mongoose from 'mongoose';
import { Booking } from './booking.model.js';
import { asyncHandler } from '../../common/asyncHandler.js';
import type { Request, Response } from 'express';

export const createBooking = asyncHandler(async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const booking = await Booking.create([req.body], { session });
    await session.commitTransaction();
    res.status(201).json(booking[0]);
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
});

import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import { fromZonedTime } from 'date-fns-tz';
import { startOfDay, endOfDay } from 'date-fns';

import { Booking } from './booking.model.js';
import { Availability } from '../availability/availability.model.js';
import { asyncHandler } from '../../common/asyncHandler.js';
import { generateSlots } from '../../common/slotGenerator.js';
import type { AuthRequest } from '../../common/types.js';


export const createBooking = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      hostUserId,
      startTimeUTC,
      endTimeUTC,
      guestName,
      guestEmail,
      guestTimezone,
    } = req.body;

    // 1️⃣ Basic validation
    if (!hostUserId || !startTimeUTC || !endTimeUTC) {
      return res.status(400).json({
        message: 'Missing required booking fields',
      });
    }

    const start = new Date(startTimeUTC);
    const end = new Date(endTimeUTC);

    if (start >= end) {
      return res.status(400).json({
        message: 'Invalid time range',
      });
    }

    // 2️⃣ COLLISION CHECK (CRITICAL)
    const conflict = await Booking.findOne({
      hostUserId,
      status: 'confirmed',
      startTimeUTC: { $lt: end },
      endTimeUTC: { $gt: start },
    });

    if (conflict) {
      return res.status(409).json({
        message: 'This time slot is no longer available',
      });
    }

    // 3️⃣ Create booking
    const booking = await Booking.create({
      hostUserId,
      guestName,
      guestEmail,
      guestTimezone,
      startTimeUTC: start,
      endTimeUTC: end,
      status: 'confirmed',
    });

    res.status(201).json(booking);
  }
);


export const cancelBooking = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { bookingId } = req.params;
    const userId = req.user.userId; // from auth middleware

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (!booking.hostUserId) {
      return res.status(400).json({ message: 'Invalid booking data' });
    }


    // 🔐 Only host can cancel
    if (booking.hostUserId.toString() !== userId) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    // Already cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled' });
  }
);



export const getMyBookings = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.userId;

    const bookings = await Booking.find({
      hostUserId: userId,
    })
      .sort({ startTimeUTC: 1 })
      .lean();

    res.json(bookings);
  }
);

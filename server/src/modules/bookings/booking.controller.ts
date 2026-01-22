import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import { fromZonedTime } from 'date-fns-tz';
import { startOfDay, endOfDay } from 'date-fns';

import { Booking } from './booking.model.js';
import { Availability } from '../availability/availability.model.js';
import { asyncHandler } from '../../common/asyncHandler.js';
import { generateSlots } from '../../common/slotGenerator.js';

export const createBooking = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      hostUserId,
      guestName,
      guestEmail,
      startTimeUTC,
      endTimeUTC,
      guestTimezone,
      meetingLink,
    } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1️⃣ Parse booking times
      const requestedStart = new Date(startTimeUTC);
      const requestedEnd = new Date(endTimeUTC);

      if (requestedEnd <= requestedStart) {
        throw new Error('Invalid booking time range');
      }

      // 2️⃣ Fetch availability rules
      const rawRules = await Availability.find({
        userId: hostUserId,
        isActive: true,
      }).lean();

      const rules = rawRules
        .filter(r => r.dayOfWeek !== null && r.startTime && r.endTime)
        .map(r => ({
          dayOfWeek: r.dayOfWeek as number,
          startTime: r.startTime as string,
          endTime: r.endTime as string,
        }));

      if (rules.length === 0) {
        throw new Error('Host has no availability');
      }

      // 3️⃣ Convert guest date → UTC day window
      const guestDate = new Date(requestedStart);
      const dayStartUTC = fromZonedTime(
        startOfDay(guestDate),
        guestTimezone
      );
      const dayEndUTC = fromZonedTime(
        endOfDay(guestDate),
        guestTimezone
      );

      // 4️⃣ Fetch overlapping bookings
      const rawBookings = await Booking.find({
        hostUserId,
        startTimeUTC: { $lt: requestedEnd },
        endTimeUTC: { $gt: requestedStart },
      }).session(session);

      if (rawBookings.length > 0) {
        throw new Error('Time slot already booked');
      }

      // 5️⃣ Generate valid slots again (server truth)
      const dayBookings = await Booking.find({
        hostUserId,
        startTimeUTC: {
          $gte: dayStartUTC,
          $lte: dayEndUTC,
        },
      }).lean();

      const normalizedBookings = dayBookings
        .filter(b => b.startTimeUTC && b.endTimeUTC)
        .map(b => ({
          startTimeUTC: b.startTimeUTC as Date,
          endTimeUTC: b.endTimeUTC as Date,
        }));

    const dateString = guestDate.toISOString().slice(0, 10);


      const slots = generateSlots({
        rules,
        date: dateString,
        timezone: guestTimezone,
        slotDuration:
          (requestedEnd.getTime() - requestedStart.getTime()) / 60000,
        existingBookings: normalizedBookings,
      });

      const isValidSlot = slots.some(
        slot =>
          slot.startUTC.getTime() === requestedStart.getTime() &&
          slot.endUTC.getTime() === requestedEnd.getTime()
      );

      if (!isValidSlot) {
        throw new Error('Requested slot is no longer available');
      }

      // 6️⃣ Create booking (transaction-safe)
      const booking = await Booking.create(
        [
          {
            hostUserId,
            guestName,
            guestEmail,
            startTimeUTC: requestedStart,
            endTimeUTC: requestedEnd,
            guestTimezone,
            meetingLink,
            status: 'confirmed',
          },
        ],
        { session }
      );

      await session.commitTransaction();

      res.status(201).json(booking[0]);
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
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

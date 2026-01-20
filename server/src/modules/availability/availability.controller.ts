import type { Request, Response } from 'express';
import { startOfDay, endOfDay } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';

import { Availability } from './availability.model.js';
import { Booking } from '../bookings/booking.model.js';
import { asyncHandler } from '../../common/asyncHandler.js';
import { generateSlots } from '../../common/slotGenerator.js';

/**
 * POST /availability
 * Host sets availability rules
 */
export const setAvailability = asyncHandler(
  async (req: Request, res: Response) => {
    const availability = await Availability.create(req.body);
    res.status(201).json(availability);
  }
);

/**
 * GET /availability/public/:userId?date=YYYY-MM-DD&tz=Asia/Kolkata
 * Guest fetches available slots
 */
export const getPublicAvailability = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { date, tz } = req.query;

    if (!date || !tz) {
      return res.status(400).json({
        message: 'date and tz query params are required',
      });
    }

    const parsedDate = new Date(date as string);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        message: 'Invalid date format. Use YYYY-MM-DD',
      });
    }

    const rawRules = await Availability.find({
        userId,
        isActive: true,
        }).lean();

        const rules = rawRules
        .filter(
            r =>
            r.dayOfWeek !== null &&
            r.startTime &&
            r.endTime
        )
        .map(r => ({
            dayOfWeek: r.dayOfWeek as number,
            startTime: r.startTime as string,
            endTime: r.endTime as string,
        }));


    const dayStartUTC = fromZonedTime(
      startOfDay(parsedDate),
      tz as string
    );

    const dayEndUTC = fromZonedTime(
      endOfDay(parsedDate),
      tz as string
    );

    const rawBookings = await Booking.find({
        hostUserId: userId,
        startTimeUTC: {
            $gte: dayStartUTC,
            $lte: dayEndUTC,
        },
        }).lean();

        const bookings = rawBookings
        .filter(
            b => b.startTimeUTC && b.endTimeUTC
        )
        .map(b => ({
            startTimeUTC: b.startTimeUTC as Date,
            endTimeUTC: b.endTimeUTC as Date,
        }));


    const slots = generateSlots({
      rules,
      date: date as string,
      timezone: tz as string,
      slotDuration: 30, // MVP default
      existingBookings: bookings,
    });

    res.json({
      date,
      timezone: tz,
      slots,
    });
  }
);

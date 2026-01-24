import type { Request, Response } from 'express';
import { fromZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import { bookingReceivedEmail } from '../../services/email/templates/bookingReceived.js';
import { Booking } from './booking.model.js';
import { User } from '../users/user.model.js';
import { sendEmail } from '../../services/email/email.service.js';
import { bookingConfirmedEmail } from '../../services/email/templates/bookingConfirmed.js';
import { asyncHandler } from '../../common/asyncHandler.js';
import type { AuthRequest } from '../../common/types.js';
import { bookingCancelledGuestEmail } from '../../services/email/templates/bookingCancelledGuest.js';
import { bookingCancelledHostEmail } from '../../services/email/templates/bookingCancelledHost.js';


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

    if (!hostUserId || !startTimeUTC || !endTimeUTC || !guestEmail) {
      return res.status(400).json({
        message: 'Missing required booking fields',
      });
    }

    const start = new Date(startTimeUTC);
    const end = new Date(endTimeUTC);

    if (start >= end) {
      return res.status(400).json({ message: 'Invalid time range' });
    }

    /* 🔒 Collision check */
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

    /* 👤 Fetch host */
    const host = await User.findById(hostUserId);

    if (!host) {
      return res.status(404).json({ message: 'Host not found' });
    }

    /* 💾 Save booking */
    const booking = await Booking.create({
      hostUserId,
      guestName,
      guestEmail,
      guestTimezone,
      startTimeUTC: start,
      endTimeUTC: end,
      status: 'confirmed',
    });

    /* 🕒 Format times for email (guest timezone) */
    const zonedStart = fromZonedTime(start, guestTimezone);
    const zonedEnd = fromZonedTime(end, guestTimezone);

    const date = format(zonedStart, 'PPP');
    const startTime = format(zonedStart, 'p');
    const endTime = format(zonedEnd, 'p');

    /* 📧 Emails (non-blocking, safe) */
    try {
      await sendEmail({
        to: guestEmail,
        subject: 'Your booking is confirmed',
        html: bookingConfirmedEmail({
          guestName,
          hostName: host.name || "",
          date,
          startTime,
          endTime,
        }),
      });

      await sendEmail({
        to: host.email || '',
        subject: 'New booking received',
        html: bookingReceivedEmail({
          hostName: host.name || 'there',
          guestName: guestName || 'Guest',
          guestEmail: guestEmail,
          date,
          startTime,
          endTime,
        }),
      });

    } catch (err) {
      console.error('Email sending failed:', err);
    }

    res.status(201).json(booking);
  }
);


export const cancelBooking = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { bookingId } = req.params;
    const userId = req.user.userId;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.hostUserId?.toString() !== userId) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Already cancelled' });
    }

    const host = await User.findById(booking.hostUserId);
    if (!host) {
      return res.status(404).json({ message: 'Host not found' });
    }

    booking.status = 'cancelled';
    await booking.save();

    /* 🕒 Format times (guest timezone) */
    const zonedStart = fromZonedTime(
      booking.startTimeUTC || 'UTC',
      booking.guestTimezone || 'UTC'
    );
    const zonedEnd = fromZonedTime(
      booking.endTimeUTC || 'UTC',
      booking.guestTimezone || 'UTC'
    );

    const date = format(zonedStart, 'PPP');
    const startTime = format(zonedStart, 'p');
    const endTime = format(zonedEnd, 'p');

    /* 📧 Emails (safe, non-blocking) */
    try {
      await sendEmail({
        to: booking.guestEmail || '',
        subject: 'Your booking has been cancelled',
        html: bookingCancelledGuestEmail({
          guestName: booking.guestName || 'there',
          hostName: host.name || "",
          date,
          startTime,
          endTime,
        }),
      });

      await sendEmail({
      to: host.email || '',
      subject: 'Booking cancelled',
      html: bookingCancelledHostEmail({
        guestName: booking.guestName || '',
        date,
        startTime,
        endTime,
      }),
    });
    } catch (err) {
      console.error('Cancel email failed:', err);
    }

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

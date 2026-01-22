import { Router } from 'express';
import { createBooking } from './booking.controller.js';
import { bookingSchema } from './booking.schema.js';
import { validate } from '../../common/validate.js';
import { authMiddleware } from '../../common/authMiddleware.js';
import { getMyBookings } from './booking.controller.js';

const router = Router();

router.post('/', validate(bookingSchema) ,createBooking);

router.get('/me', authMiddleware, getMyBookings);

export default router;

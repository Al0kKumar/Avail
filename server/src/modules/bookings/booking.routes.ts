import { Router } from 'express';
import { createBooking } from './booking.controller.js';
import { bookingSchema } from './booking.schema.js';
import { validate } from '../../common/validate.js';

const router = Router();

router.post('/', validate(bookingSchema) ,createBooking);

export default router;

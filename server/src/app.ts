import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errorHandler } from './common/error.js';

import userRoutes from './modules/users/user.routes.js';
import availabilityRoutes from './modules/availability/availability.routes.js';
import bookingRoutes from './modules/bookings/booking.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => {
  res.json({ status: 'OK' });
});

app.use('/users', userRoutes);
app.use('/availability', availabilityRoutes);
app.use('/bookings', bookingRoutes);

app.use(errorHandler);

export default app;

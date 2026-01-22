import api from '../../lib/api';

export const createBooking = async bookingData => {
  const res = await api.post('/bookings', bookingData);
  return res.data;
};

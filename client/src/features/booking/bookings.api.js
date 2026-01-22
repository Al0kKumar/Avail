import api from '../../lib/api';

export const createBooking = async bookingData => {
  const res = await api.post('/bookings', bookingData);
  return res.data;
};

export const getMyBookings = async bookingData => {
  const res = await api.post('/bookings/me', bookingData);
  return res.data;
};



import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../layouts/DashboardLayout';
import { getMyBookings } from '../../features/booking/bookings.api';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = date =>
    new Date(date).toLocaleDateString();

  const formatTime = date =>
    new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-semibold text-white">
        Bookings
      </h1>
      <p className="mt-2 text-white/60">
        All meetings booked with you.
      </p>

      <div className="mt-8">
        {loading && (
          <p className="text-white/40">Loading bookings…</p>
        )}

        {!loading && bookings.length === 0 && (
          <p className="text-white/40">
            No bookings yet.
          </p>
        )}

        {!loading && bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map(booking => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  rounded-xl
                  bg-white/5
                  backdrop-blur
                  border border-white/10
                  p-6
                  flex justify-between items-center
                "
              >
                <div>
                  <p className="text-white font-medium">
                    {booking.guestName}
                  </p>
                  <p className="text-sm text-white/60">
                    {booking.guestEmail}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-white">
                    {formatDate(booking.startTimeUTC)}
                  </p>
                  <p className="text-sm text-white/60">
                    {formatTime(booking.startTimeUTC)} –{' '}
                    {formatTime(booking.endTimeUTC)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

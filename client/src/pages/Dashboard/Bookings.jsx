import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  getMyBookings,
  cancelBooking,
} from '../../features/booking/bookings.api';
import Toast from '../../components/Toast';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const handleCancel = async bookingId => {
    if (!confirm('Cancel this booking?')) return;

    try {
      await cancelBooking(bookingId);

      // ✅ Optimistic UI update
      setBookings(prev =>
        prev.map(b =>
          b._id === bookingId
            ? { ...b, status: 'cancelled' }
            : b
        )
      );
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to cancel booking' });
    }
    finally {
    setTimeout(() => setToast(null), 2000);
  }
  };

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
      <Toast show={!!toast} type={toast?.type} message={toast?.message} />

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
                transition={{ duration: 0.25 }}
                className="
                  rounded-xl
                  bg-white/5
                  backdrop-blur
                  border border-white/10
                  p-6
                  flex justify-between items-center
                "
              >
                {/* Guest */}
                <div>
                  <p className="text-white font-medium">
                    {booking.guestName}
                  </p>
                  <p className="text-sm text-white/60">
                    {booking.guestEmail}
                  </p>
                </div>

                {/* Time */}
                <div className="text-right">
                  <p className="text-white">
                    {formatDate(booking.startTimeUTC)}
                  </p>
                  <p className="text-sm text-white/60">
                    {formatTime(booking.startTimeUTC)} –{' '}
                    {formatTime(booking.endTimeUTC)}
                  </p>
                </div>

                {/* Status + Actions */}
                <div className="flex items-center gap-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      booking.status === 'confirmed'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {booking.status}
                  </span>

                  {booking.status === 'confirmed' && (
                    <button
                      onClick={() =>
                        handleCancel(booking._id)
                      }
                      className="
                        cursor-pointer
                        text-sm
                        text-red-400
                        hover:text-red-300
                      "
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

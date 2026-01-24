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
  const [cancellingId, setCancellingId] = useState(null);
  const [showCancelled, setShowCancelled] = useState(false);

  /* ---------------- FETCH ---------------- */

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

  /* ---------------- DERIVED STATE ---------------- */

  const now = new Date();

  const upcomingBookings = bookings.filter(
    b =>
      b.status === 'confirmed' &&
      new Date(b.startTimeUTC) > now
  );

  const cancelledBookings = bookings.filter(
    b => b.status === 'cancelled'
  );

  const visibleBookings = showCancelled
    ? cancelledBookings
    : upcomingBookings;

  /* ---------------- ACTIONS ---------------- */

  const handleCancel = async bookingId => {
    try {
      setCancellingId(bookingId);

      await cancelBooking(bookingId);

      // optimistic update
      setBookings(prev =>
        prev.map(b =>
          b._id === bookingId
            ? { ...b, status: 'cancelled' }
            : b
        )
      );

      setToast({
        type: 'success',
        message: 'Booking cancelled',
      });

      setTimeout(() => setToast(null), 1500);
    } catch (err) {
      setToast({
        type: 'error',
        message: 'Failed to cancel booking',
      });
      setTimeout(() => setToast(null), 2000);
    } finally {
      setCancellingId(null);
    }
  };

  /* ---------------- HELPERS ---------------- */

  const formatDate = date =>
    new Date(date).toLocaleDateString();

  const formatTime = date =>
    new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  /* ---------------- UI ---------------- */

  return (
    <DashboardLayout>
      <Toast show={!!toast} type={toast?.type} message={toast?.message} />

      <h1 className="text-3xl font-semibold text-white">
        Bookings
      </h1>
      <p className="mt-2 text-white/60">
        Manage your upcoming and cancelled meetings.
      </p>

      {/* FILTER TABS */}
      <div className="mt-6 flex gap-8 text-sm">
        {[
          { label: 'Upcoming', active: !showCancelled, onClick: () => setShowCancelled(false) },
          { label: 'Cancelled', active: showCancelled, onClick: () => setShowCancelled(true) },
        ].map(tab => (
          <button
            key={tab.label}
            onClick={tab.onClick}
            className={`
              relative
              pb-1
              cursor-pointer
              transition-colors
              ${
                tab.active
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/70'
              }
            `}
          >
            {tab.label}

            {/* animated underline */}
            <span
              className={`
                absolute left-0 bottom-0
                h-[2px] w-full
                bg-gradient-to-r from-emerald-400 to-emerald-500
                transform origin-left
                transition-transform duration-300 ease-out
                ${
                  tab.active
                    ? 'scale-x-100'
                    : 'scale-x-0 group-hover:scale-x-100'
                }
              `}
            />
          </button>
        ))}
      </div>


      {/* LIST */}
      <div className="mt-8">
        {loading && (
          <p className="text-white/40">Loading bookings…</p>
        )}

        {!loading && visibleBookings.length === 0 && (
          <p className="text-white/40">
            {showCancelled
              ? 'No cancelled bookings.'
              : 'No upcoming bookings.'}
          </p>
        )}

        {!loading && visibleBookings.length > 0 && (
          <div className="space-y-4">
            {visibleBookings.map(booking => {
              const isCancelling =
                cancellingId === booking._id;

              return (
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

                  {/* Status + Action */}
                  <div className="flex items-center gap-4 min-w-[140px] justify-end">
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
                        disabled={isCancelling}
                        onClick={() =>
                          handleCancel(booking._id)
                        }
                        className={`
                          flex items-center gap-2
                          cursor-pointer
                          text-sm
                          transition
                          ${
                            isCancelling
                              ? 'text-white/40 cursor-not-allowed'
                              : 'text-red-400 hover:text-red-300'
                          }
                        `}
                      >
                        {isCancelling && (
                          <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        )}
                        {isCancelling ? 'Cancelling…' : 'Cancel'}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

import { useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { getMe } from '../../features/user/user.api';
import { getMyBookings } from '../../features/booking/bookings.api';
import { motion } from 'framer-motion';

export default function DashboardHome() {
  const [user, setUser] = useState(null);
  const [upcomingCount, setUpcomingCount] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [me, bookings] = await Promise.all([
          getMe(),
          getMyBookings(),
        ]);

        setUser(me);

        const now = new Date();
        const upcoming = bookings.filter(
          b =>
            b.status === 'confirmed' &&
            new Date(b.startTimeUTC) > new Date()
        );

        setUpcomingCount(upcoming.length);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const bookingLink = user
    ? `${window.location.origin}/${user.publicSlug}`
    : '';

  const copyLink = async () => {
    await navigator.clipboard.writeText(bookingLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-semibold text-white tracking-tight">
        Dashboard
      </h1>

      <p className="mt-2 text-white/60">
        Share your booking link and manage your schedule.
      </p>

      {/* Cards */}
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {/* BOOKING LINK */}
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-sm text-white/60 mb-2">
            Your booking link
          </h3>

          {!user && (
            <p className="text-white/40 text-sm">
              Loading…
            </p>
          )}

          {user && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-white text-sm truncate">
                {bookingLink}
              </span>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={copyLink}
                className="
                  relative
                  px-3 py-1.5
                  rounded-lg
                  cursor-pointer
                  text-sm font-medium
                  text-emerald-300
                  border border-emerald-400/30
                  hover:border-emerald-400
                  hover:bg-emerald-400/10
                  transition
                "
              >
                {copied ? 'Copied ✓' : 'Copy'}
              </motion.button>
            </div>
          )}
        </div>

        {/* UPCOMING BOOKINGS */}
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-sm text-white/60 mb-2">
            Upcoming bookings
          </h3>

          {upcomingCount === null ? (
            <p className="text-white/40 text-sm">
              Loading…
            </p>
          ) : (
            <p className="text-white text-3xl font-semibold">
              {upcomingCount}
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

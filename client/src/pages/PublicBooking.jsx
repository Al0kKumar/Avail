import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';

import { createBooking } from '../features/booking/bookings.api';
import { getPublicAvailability } from '../features/availability/availability.api';
import { getPublicUserBySlug } from '../features/user/user.api';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function PublicBooking() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [host, setHost] = useState(null);

  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);

  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  const timezone =
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  /* ---------------- HOST RESOLUTION ---------------- */

  useEffect(() => {
    const fetchHost = async () => {
      try {
        const data = await getPublicUserBySlug(slug);
        setHost(data);
      } catch (err) {
        console.error(err);
        alert('User not found');
      }
    };

    fetchHost();
  }, [slug]);

  /* ---------------- AVAILABILITY ---------------- */

  useEffect(() => {
    if (!host || !date) return;

    const fetchSlots = async () => {
      setLoading(true);
      try {
        const data = await getPublicAvailability({
          userId: host.id,
          date,
          timezone,
        });

        setSlots(data.slots);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [host, date, timezone]);

  const formatTime = utc =>
    new Date(utc).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  /* ---------------- CREATE BOOKING ---------------- */

  const handleBooking = async () => {
    if (!guestName || !guestEmail) {
      alert('Please enter your name and email');
      return;
    }

    try {
      await createBooking({
        hostUserId: host.id,
        startTimeUTC: selectedSlot.startUTC,
        endTimeUTC: selectedSlot.endUTC,
        guestName,
        guestEmail,
        guestTimezone: timezone,
      });

      navigate(`/${host.publicSlug}/success`);
    } catch (err) {
      console.error(err);
      alert('Failed to book slot');
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        className="
          w-full max-w-4xl
          rounded-2xl
          bg-white/5
          backdrop-blur-xl
          border border-white/10
          shadow-xl shadow-black/30
          p-10
        "
      >
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Book a meeting with {host?.name}
          </h1>
          <p className="mt-2 text-white/60">
            Choose a date and time that works for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Date */}
          <div>
            <h3 className="text-sm text-white mb-3">
              Select date
            </h3>
            <input
              type="date"
              value={date}
              onChange={e => {
                setDate(e.target.value);
                setSelectedSlot(null);
              }}
              className="
                w-full rounded-xl px-4 py-3
                bg-white/10 text-white
                border border-white/10
              "
            />
          </div>

          {/* Slots */}
          <div>
            <h3 className="text-sm text-white mb-3">
              Available times
            </h3>

            {!date && (
              <p className="text-white/40 text-sm">
                Select a date first
              </p>
            )}

            {loading && (
              <p className="text-white/40 text-sm">
                Loading slots…
              </p>
            )}

            {!loading && date && slots.length === 0 && (
              <p className="text-white/40 text-sm">
                No availability on this date
              </p>
            )}

            <div className="grid grid-cols-2 gap-3">
              {slots.map(slot => {
                const label = formatTime(slot.startUTC);

                return (
                  <button
                    key={slot.startUTC}
                    onClick={() => setSelectedSlot(slot)}
                    className={`
                      px-4 py-3 rounded-lg text-sm transition border
                      ${
                        selectedSlot?.startUTC === slot.startUTC
                          ? 'bg-emerald-500 text-black border-emerald-400'
                          : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                      }
                    `}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Guest form */}
        {selectedSlot && (
          <div className="mt-10 grid gap-4">
            <div>
              <label className="block text-sm text-white/70 mb-1">
                Your name
              </label>
              <input
                type="text"
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                placeholder="John Doe"
                className="
                  w-full px-4 py-3 rounded-xl
                  bg-white/10 text-white
                  border border-white/10
                "
              />
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-1">
                Email address
              </label>
              <input
                type="email"
                value={guestEmail}
                onChange={e => setGuestEmail(e.target.value)}
                placeholder="john@email.com"
                className="
                  w-full px-4 py-3 rounded-xl
                  bg-white/10 text-white
                  border border-white/10
                "
              />
            </div>
          </div>
        )}

        {/* CTA */}
        {selectedSlot && (
          <div className="mt-10 flex justify-end">
            <button
              onClick={handleBooking}
              disabled={!guestName || !guestEmail}
              className={`
                px-6 py-3 rounded-xl transition
                ${
                  guestName && guestEmail
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
                    : 'bg-white/20 text-white/40 cursor-not-allowed'
                }
              `}
            >
              Confirm booking →
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

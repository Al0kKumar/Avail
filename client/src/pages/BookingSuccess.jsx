import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';

export default function BookingSuccess() {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Invalid booking
      </div>
    );
  }

  const {
    hostName,
    guestName,
    guestEmail,
    startTime,
    endTime,
  } = state;

  const formatDate = date =>
    new Date(date).toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const formatTime = date =>
    new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          w-full max-w-lg
          rounded-2xl
          bg-white/5
          backdrop-blur-xl
          border border-white/10
          shadow-xl shadow-black/30
          p-10
          text-center
        "
      >
        <h1 className="text-3xl font-semibold text-white">
          Booking confirmed 🎉
        </h1>

        <p className="mt-4 text-white/70">
          You’ve successfully booked a meeting with{' '}
          <span className="text-white font-medium">
            {hostName}
          </span>
          .
        </p>

        <div className="mt-6 text-white/80">
          <p>{formatDate(startTime)}</p>
          <p className="mt-1">
            {formatTime(startTime)} – {formatTime(endTime)}
          </p>
        </div>

        <p className="mt-6 text-sm text-white/50">
          A confirmation has been sent to{' '}
          <span className="text-white">{guestEmail}</span>
        </p>

        <div className="mt-8">
          <Link to="/dashboard">
            <Button className='cursor-pointer'>Back to home</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

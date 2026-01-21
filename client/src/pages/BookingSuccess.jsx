import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function BookingSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        className="
          w-full max-w-md
          rounded-2xl
          bg-white/5
          backdrop-blur-xl
          border border-white/10
          shadow-xl shadow-black/30
          p-10
          text-center
        "
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div
            className="
              h-14 w-14
              rounded-full
              bg-emerald-500/15
              flex items-center justify-center
            "
          >
            <span className="text-emerald-400 text-2xl">✓</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          You’re booked!
        </h1>

        <p className="mt-3 text-white/60">
          Your meeting has been successfully scheduled.
        </p>

        {/* Details */}
        <div className="mt-8 space-y-3 text-sm">
          <div className="flex justify-between text-white/60">
            <span>Date</span>
            <span className="text-white">Jan 20, 2026</span>
          </div>

          <div className="flex justify-between text-white/60">
            <span>Time</span>
            <span className="text-white">10:30 AM</span>
          </div>

          <div className="flex justify-between text-white/60">
            <span>With</span>
            <span className="text-white">Alok</span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-white/10" />

        {/* Footer */}
        <p className="text-xs text-white/40">
          A confirmation email has been sent to you.
        </p>

        <Link
          to="/"
          className="
            inline-block mt-6
            text-sm
            text-emerald-400
            hover:text-emerald-300
          "
        >
          Back to home
        </Link>
      </motion.div>
    </div>
  );
}

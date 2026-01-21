import { useState } from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

// MOCK DATA (UI only)
const MOCK_SLOTS = [
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
];

export default function PublicBooking() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);

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
        {/* HEADER */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(34,197,94,0.8)]" />
            <span className="text-sm text-white/60">Avail</span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Book time with Alok
          </h1>

          <p className="mt-2 text-white/60">
            Pick a date and time that works for you.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* DATE PICKER */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3">
              Select a date
            </h3>

            <input
              type="date"
              value={selectedDate}
              onChange={e => {
                setSelectedDate(e.target.value);
                setSelectedSlot(null);
              }}
              className="
                w-full
                bg-white/10
                text-white
                rounded-xl
                px-4 py-3
                border border-white/10
                focus:outline-none
              "
            />
          </div>

          {/* TIME SLOTS */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3">
              Available times
            </h3>

            {!selectedDate ? (
              <p className="text-white/40 text-sm">
                Select a date to see available times.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {MOCK_SLOTS.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`
                      rounded-lg px-4 py-3 text-sm transition
                      border
                      ${
                        selectedSlot === slot
                          ? 'bg-emerald-500 text-black border-emerald-400'
                          : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                      }
                    `}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        {selectedSlot && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="mt-10 flex justify-end"
          >
            <button
              className="
                px-6 py-3
                rounded-xl
                bg-emerald-500
                text-black
                font-medium
                shadow-lg shadow-emerald-500/25
              "
            >
              Continue →
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

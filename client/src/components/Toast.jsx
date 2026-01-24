import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ message, type = 'success', show }) {
  if (!show) return null;

  const styles = {
    success: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
    error: 'bg-red-500/15 text-red-300 border-red-400/30',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={`
          fixed bottom-6 left-1/2 -translate-x-1/2
          z-50
          px-4 py-3
          rounded-xl
          border
          backdrop-blur-xl
          shadow-lg shadow-black/30
          text-sm font-medium
          ${styles[type]}
        `}
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
}

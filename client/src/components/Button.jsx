import { motion } from 'framer-motion';

export default function Button({
  children,
  onClick,
  className = '',
  variant = 'primary',
}) {
  const base =
    'px-6 py-3 rounded-lg font-medium transition-colors duration-200';

  const variants = {
  primary:
    'bg-emerald-500 text-black hover:bg-emerald-400',
  secondary:
    'bg-white/10 text-white hover:bg-white/20',
};


  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}

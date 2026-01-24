
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from './Button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: scrolled
          ? 'rgba(2, 6, 23, 0.78)' // deep slate glass
          : 'rgba(2, 6, 23, 0.45)',
        backdropFilter: 'blur(18px)',
        boxShadow: scrolled
          ? '0 12px 40px rgba(0,0,0,0.55)'
          : '0 4px 20px rgba(0,0,0,0.35)',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="
        fixed top-6 left-1/2 -translate-x-1/2
        z-50
        w-[92%] max-w-5xl
        rounded-2xl
        border border-white/10
      "
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link to="/" className="group flex items-center gap-2">
          {/* subtle green dot / mark */}
          <span
            className="
              inline-block
              h-2 w-2
              rounded-full
              bg-emerald-400
              shadow-[0_0_12px_rgba(34,197,94,0.8)]
            "
          />

          {/* brand text */}
          <span
            className="
              text-lg
              font-semibold
              tracking-tight
              bg-clip-text text-transparent
              bg-gradient-to-b
              from-white
              via-white/90
              to-white/70
              group-hover:from-emerald-200
              group-hover:to-white
              transition-colors
            "
          >
            Avail
          </span>
        </Link>

        {/* CTA */}
        <Link to="/login">
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="
            px-4 py-2
            rounded-xl
            cursor-pointer
            text-sm font-medium
            text-emerald-300
            border border-emerald-400/30
            hover:border-emerald-400
            hover:bg-emerald-400/10
            transition
          "
        >
    Sign in
  </motion.button>
</Link>

      </div>
    </motion.nav>
  );
}

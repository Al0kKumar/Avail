import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header
      className="
        h-16
        border-b border-white/10
        flex items-center justify-between
        px-4 sm:px-10
        bg-white/5
        backdrop-blur-xl
      "
    >
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="md:hidden text-white/70 hover:text-white"
      >
        <Menu size={22} />
      </button>

      {/* Spacer on desktop */}
      <div className="hidden md:block" />

      {/* Logout */}
      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.97 }}
        onClick={logout}
        className="
          px-4 py-2
          rounded-xl
          cursor-pointer
          text-sm font-medium
          text-white/70
          border border-white/10
          hover:border-red-400/40
          hover:text-red-300
          hover:bg-red-500/10
          transition
        "
      >
        Logout
      </motion.button>
    </header>
  );
}

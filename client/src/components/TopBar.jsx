import { Link } from 'react-router-dom';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Topbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/") 
  }

  return (
    <header
      className="
        h-16
        border-b border-white/10
        flex items-center justify-end
        px-10
        bg-white/5
        backdrop-blur-xl
      "
    >
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

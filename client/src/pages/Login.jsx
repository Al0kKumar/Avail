import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Button from '../components/Button';
import { loginWithGoogle } from '../features/auth/auth.api';
import { useState } from 'react';
import Toast from '../components/Toast';

export default function Login() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const handleGoogleSuccess = async credentialResponse => {
    try {
      const { token } = await loginWithGoogle(
        credentialResponse.credential // ✅ THIS IS id_token
      );

      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setToast({ type: 'error', message: 'Failed to Signin' });
    }
    finally {
    setTimeout(() => setToast(null), 2000);
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">

      <Toast show={!!toast} type={toast?.type} message={toast?.message} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="
          w-full max-w-md
          p-10
          rounded-2xl
          bg-white/5
          backdrop-blur-xl
          border border-white/10
          text-center
        "
      >
        {/* Logo */}
        <Link to="/" className="block mb-6">
          <div className="flex justify-center items-center gap-2">
            {/* glowing dot */}
            <span
              className="
                h-2 w-2
                rounded-full
                bg-emerald-400
                shadow-[0_0_14px_rgba(34,197,94,0.9)]
              "
            />

            {/* brand name */}
            <span
              className="
                text-xl font-semibold tracking-tight
                text-white
              "
            >
              Avail
            </span>
          </div>
        </Link>


        <h1 className="text-3xl font-semibold text-white">
          Welcome back
        </h1>


        <p className="mt-3 text-white/60 text-sm">
          Sign in to manage your availability and bookings
        </p>

        {/* 🔐 REAL GOOGLE LOGIN (HIDDEN BUTTON) */}
        {/* 🔐 GOOGLE LOGIN — TIGHT PREMIUM BORDER */}
<motion.div
  whileHover={{ y: -2 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  className="mt-10 flex justify-center"
>
  <div
    className="
      relative
      rounded-xl
      bg-gradient-to-r from-emerald-400/70 via-emerald-500 to-emerald-400/70
      shadow-[0_0_25px_rgba(34,197,94,0.45)]
    "
  >
    {/* inner layer — NO GAP */}
    <div
      className="
        rounded-[11px]
        bg-black
        overflow-hidden
      "
    >
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => alert('Google login failed')}
        theme="filled_black"
        size="large"
        width="260"
      />
    </div>
  </div>
</motion.div>



        {/* Optional footer */}
        <p className="mt-6 text-xs text-white/40">
          Secure sign-in powered by Google
        </p>
      </motion.div>
    </div>
  );
}

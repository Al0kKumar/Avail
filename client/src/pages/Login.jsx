import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import Button from '../components/Button';
import { loginWithGoogle } from '../features/auth/auth.api';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Login() {
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    flow: 'implicit',
    onSuccess: async tokenResponse => {
      try {
        const { token } = await loginWithGoogle(
          tokenResponse.id_token
        );

        localStorage.setItem('token', token);
        navigate('/dashboard');
      } catch (err) {
        console.error(err);
        alert('Login failed');
      }
    },
  });


  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
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
        {/* Logo */}
        <Link to="/" className="flex justify-center items-center gap-2 mb-6">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(34,197,94,0.8)]" />
          <span
            className="
              text-lg font-semibold tracking-tight
              bg-clip-text text-transparent
              bg-gradient-to-b from-white via-white/90 to-white/70
            "
          >
            Avail
          </span>
        </Link>

        {/* Heading */}
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Welcome back
        </h1>

        <p className="mt-3 text-white/60 text-sm">
          Sign in to manage your availability and bookings.
        </p>

        {/* CTA — YOUR BUTTON, REAL GOOGLE AUTH */}
        <motion.div
          className="mt-8"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Button
            className="w-full py-4 cursor-pointer shadow-lg shadow-emerald-500/25"
            onClick={() => googleLogin()}
          >
            Continue with Google
          </Button>
        </motion.div>

        {/* Footer */}
        <p className="mt-6 text-xs text-white/40">
          By continuing, you agree to our terms and privacy policy.
        </p>
      </motion.div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import Button from '../components/Button';
import { loginWithGoogleCode } from '../features/auth/auth.api';

export default function Login() {
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async response => {
      try {
        const { token } = await loginWithGoogleCode(
          response.code // 👈 AUTH CODE
        );

        localStorage.setItem('token', token);
        navigate('/dashboard');
      } catch (err) {
        console.error(err);
        alert('Login failed');
      }
    },
    onError: () => alert('Google login failed'),
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div className="w-full max-w-md p-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
        <Link to="/" className="block text-center text-white text-xl mb-6">
          Avail
        </Link>

        <h1 className="text-3xl font-semibold text-white text-center">
          Welcome back
        </h1>

        {/* FULLY CUSTOM BUTTON */}
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10"
        >
          <Button
            className="
              w-full py-4
              bg-gradient-to-r from-emerald-400 to-emerald-500
              text-black font-semibold
              shadow-lg shadow-emerald-500/30
            "
            onClick={() => googleLogin()}
          >
            Continue with Google
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

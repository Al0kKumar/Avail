import { Navigate } from 'react-router-dom';
import { useAuth } from './features/auth/useAuth';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  return children;
}

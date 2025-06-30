import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const { session, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading skeleton
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}; 
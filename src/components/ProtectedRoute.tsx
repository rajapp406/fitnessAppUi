import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import tokenStore from '../lib/tokenStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const [isValidating, setIsValidating] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simple check for access token
    const checkAuth = () => {
      const token = tokenStore.getAccessToken();
      if (!token && user) {
        // If there's no token but user state exists, clear it
        localStorage.removeItem('user');
      }
      setIsValidating(false);
    };

    checkAuth();
  }, [user]);

  if (isValidating) {
    // Show a loading spinner while checking auth
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login but save the current location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
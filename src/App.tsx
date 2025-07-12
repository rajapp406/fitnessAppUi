import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate, useLocation } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import { QueryProvider } from './providers/QueryProvider';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Layout component for protected routes
function ProtectedLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Only run this check if user is authenticated
    if (isAuthenticated && location.pathname === '/app/onboarding') {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        // If user has completed onboarding, redirect to dashboard
        if (user?.profile) {
          navigate('/app/dashboard', { replace: true });
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}

// Root layout component
function RootLayout() {
  return (
    <Provider store={store}>
      <QueryProvider>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Outlet />
          </div>
        </AuthProvider>
      </QueryProvider>
    </Provider>
  );
}

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "app",
        element: <ProtectedLayout />,
        children: [
          {
            path: "onboarding",
            element: <Onboarding />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
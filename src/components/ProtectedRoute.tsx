import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
  requireAuth?: boolean;
  redirectPath?: string;
  children?: React.ReactNode;
}

/**
 * ProtectedRoute component that handles authentication-based routing
 * @param requireAuth - If true, the user must be authenticated to access the route
 * @param redirectPath - The path to redirect to if authentication requirements are not met
 * @param children - Optional children to render instead of using Outlet
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requireAuth = true,
  redirectPath = '/',
  children
}) => {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // If requireAuth is true and user is not authenticated, redirect to specified path
  if (requireAuth && !user) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // If requireAuth is false and user is authenticated, redirect to specified path
  // This is useful for routes like login that should redirect to dashboard if already logged in
  if (!requireAuth && user) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // If authentication requirements are met, render children or Outlet
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute; 
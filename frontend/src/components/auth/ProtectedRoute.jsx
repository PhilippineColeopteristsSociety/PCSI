import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Don't redirect while loading
  if (isLoading) {
    return children;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/auth/login" state={{ from: location }} replace />;
  }

  // Check role-based access if required
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;

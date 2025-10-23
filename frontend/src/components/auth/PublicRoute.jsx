import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/ui/spinner';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Don't redirect while loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="size-10" />
      </div>
    );
  }
  // Redirect to admin dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default PublicRoute;

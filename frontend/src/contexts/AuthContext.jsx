import React, { createContext, useContext, useEffect, useState } from 'react';
import authService from '@/services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on app load
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const storedUser = authService.getStoredUser();
      const token = authService.getAccessToken();
      
      if (storedUser && token) {
        // Set user immediately from stored data to prevent redirects
        setUser(storedUser);
        setIsAuthenticated(true);
        
        // Verify token in background without blocking UI
        try {
          const result = await authService.getCurrentUser();
          if (result.success) {
            setUser(result.data.data.user);
            setIsAuthenticated(true);
          } else {
            // Token is invalid, try to refresh in background
            const refreshSuccess = await handleTokenRefresh();
            if (!refreshSuccess) {
              // Only logout if refresh fails
              await logout();
            }
          }
        } catch (error) {
          console.error('Background auth verification failed:', error);
          // Don't logout immediately, let user continue
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      // Don't logout immediately on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenRefresh = async () => {
    try {
      const result = await authService.refreshToken();
      
      if (result.success) {
        const refreshedUser = authService.getStoredUser();
        setUser(refreshedUser);
        setIsAuthenticated(true);
        return true;
      } else {
        // Refresh failed, logout user
        await logout();
        return false;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      await logout();
      return false;
    }
  };

  const login = async (credentials) => {
    try {
      setIsLoading(true);

      const result = await authService.login(credentials);
      
      if (result.success) {
        const userData = authService.getStoredUser();
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
    handleTokenRefresh,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authData = localStorage.getItem('adminAuth');
      if (authData) {
        const parsed = JSON.parse(authData);
        // Check if token is not expired (e.g., 24 hours)
        const isExpired = Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000;
        if (!isExpired) {
          setUser(parsed.user);
        } else {
          // Clear expired token
          localStorage.removeItem('adminAuth');
          localStorage.removeItem('__pb_superuser_auth__');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    const authData = {
      isAuthenticated: true,
      user: userData,
      timestamp: Date.now()
    };
    localStorage.setItem('adminAuth', JSON.stringify(authData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('__pb_superuser_auth__');
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
};

export default useAuth;
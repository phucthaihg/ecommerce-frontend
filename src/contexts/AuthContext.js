import React, { createContext, useState, useEffect } from 'react';
import { login, register, getUserProfile, logout, getToken } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Automatically fetch user profile if token exists
  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const userData = await getUserProfile();
          setUser(userData);
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          logout();
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  // Handle user login
  const handleLogin = async (credentials) => {
    try {
      const { user } = await login(credentials);
      setUser(user);
      setError(null);
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      throw error;
    }
  };

  // Handle user registration
  const handleRegister = async (userData) => {
    try {
      await register(userData);
      setError(null);
    } catch (error) {
      setError('Registration failed. Please try again.');
      throw error;
    }
  };

  // Handle user logout
  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const isAdmin = () => user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        handleLogin,
        handleRegister,
        handleLogout,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

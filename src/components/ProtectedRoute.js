import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useContext(AuthContext);

  // Check if the user is logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If `adminOnly` is true, ensure the user is an admin
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  // Render the children if all checks pass
  return children;
};

export default ProtectedRoute;

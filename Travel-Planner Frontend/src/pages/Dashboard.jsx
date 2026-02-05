import React from 'react';
import { useAuth } from '../lib/AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    // This should be handled by ProtectedRoute, but as a fallback
    return <Navigate to="/login" />;
  }

  if (user.role === 'ADMIN') {
    return <Navigate to="/admin/dashboard" />;
  }

  if (user.role === 'USER') {
    return <Navigate to="/user/dashboard" />;
  }

  // Fallback for any other role or if role is not defined
  return <div>Invalid user role.</div>;
};

export default Dashboard;

// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // If the user is not authenticated, redirect to the sign-in page
    return <Navigate to="/signin" replace />;
  }

  // If the user is authenticated, render the child components
  return children;
}

export default PrivateRoute;
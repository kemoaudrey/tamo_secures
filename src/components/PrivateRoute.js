// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, allowedRoles }) => {
  const userRole = localStorage.getItem('userRole');

  // Check if the user's role is allowed
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />; // Redirect to login if not authorized
  }

  return element; // Render the component if authorized
};

export default PrivateRoute;
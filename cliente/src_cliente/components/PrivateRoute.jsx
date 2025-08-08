import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem('rol_usuario');

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/accessdenied" replace />;
  }
  return children;
};

export default PrivateRoute;

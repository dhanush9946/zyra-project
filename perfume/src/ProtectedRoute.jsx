import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Role check
  if (role && user.role !== role) {
    return <Navigate to="/" />; // normal users trying to access admin
  }

  return children;
};

export default ProtectedRoute;

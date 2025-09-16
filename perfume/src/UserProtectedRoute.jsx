import React from "react";
import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // If not logged in, go to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If logged in but role is "admin", block access
  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  }

  // Otherwise allow normal user access
  return children;
};

export default UserProtectedRoute;

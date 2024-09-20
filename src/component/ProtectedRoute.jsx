import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Check if user is authenticated

  if (!isAuthenticated) {
    // If user is not authenticated, redirect to /signin
    return <Navigate to="/signin" />;
  }

  // If authenticated, allow access to the route
  return children;
};

export default ProtectedRoute;

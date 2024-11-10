// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom"; // Ganti Redirect dengan Navigate untuk React Router v6+

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    // Jika tidak ada token, redirect ke halaman login
    return <Navigate to="/login" />;
  }

  return children; // Jika ada token, render halaman yang dilindungi
};

export default PrivateRoute;

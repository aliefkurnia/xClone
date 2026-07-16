import { useAuth } from "@clerk/react";
import { Navigate } from "react-router-dom";
import Login from "./Login";

const AuthRedirect = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div className="loading">Loading...</div>;
  }

  if (isSignedIn) {
    return <Navigate to="/home" replace />;
  }

  return <Login />;
};

export default AuthRedirect;

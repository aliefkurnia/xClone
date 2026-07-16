import { useAuth } from "@clerk/react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div className="loading">Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;

// ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContexts";

const PrivateRoute: React.FC<{
  children: React.ReactNode;
  role?: string;
}> = ({ children, role }) => {
  const { user, role: userRole, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user || (role && userRole !== role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;

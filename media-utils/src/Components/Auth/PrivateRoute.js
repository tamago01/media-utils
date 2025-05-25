// ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContexts";
const PrivateRoute = ({ children, role }) => {
    const { user, role: userRole, loading } = useAuth();
    if (loading)
        return React.createElement("p", null, "Loading...");
    if (!user || (role && userRole !== role)) {
        return React.createElement(Navigate, { to: "/login", replace: true });
    }
    return React.createElement(React.Fragment, null, children);
};
export default PrivateRoute;

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function PrivateRoute() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) return <Outlet />;

  return <Navigate to="/auth" />;
}

export default PrivateRoute;

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { PublicRoutes } from "../../models/routes";

function PrivateGuard() {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) return <Outlet />;
  return <Navigate to={PublicRoutes.AUTH} />;
}

export default PrivateGuard;

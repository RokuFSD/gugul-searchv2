import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { selectUser } from "../../redux/features/auth/authSlice";
import { PrivateRoutes } from "../../models/routes";
import { useAppSelector } from "../../redux/hooks/store";

function AuthGuard() {
  const user = useAppSelector(selectUser);
  if (user.email) {
    return <Navigate to={`/${PrivateRoutes.PROFILE}`} replace />;
  }
  return <Outlet />;
}

export default AuthGuard;

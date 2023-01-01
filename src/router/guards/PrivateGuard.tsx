/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { PublicRoutes } from "../../models/routes";
import { useAppSelector } from "../../redux/hooks/store";
import { selectUser } from "../../redux/features/auth/authSlice";

function PrivateGuard() {
  const user = useAppSelector(selectUser);

  if (!user.email) {
    return <Navigate to={PublicRoutes.AUTH} replace />;
  }
  return <Outlet />;
}

export default PrivateGuard;

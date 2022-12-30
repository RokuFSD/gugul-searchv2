import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { selectUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks/store";

function PrivateRoute() {
  const user = useAppSelector(selectUser);
  if (user.email) return <Outlet />;

  return <Navigate to="/auth" />;
}

export default PrivateRoute;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PublicRoutes } from "../../models/routes";
import { useAppDispatch } from "../../redux/hooks/store";
import { me } from "../../redux/features/auth/thunkActions";
import { selectUser } from "../../redux/features/auth/authSlice";

function PrivateGuard() {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      dispatch(me())
        .unwrap()
        .catch((err) => {})
        .finally(() => setIsLoading(false));
    }

    if (!user.username) {
      setIsLoading(true);
      fetchUser();
    }
  }, []);

  if (!user.username) {
    return isLoading ? (
      <div>Loading...</div>
    ) : (
      <Navigate to={PublicRoutes.AUTH} />
    );
  }
  return <Outlet />;
}

export default PrivateGuard;

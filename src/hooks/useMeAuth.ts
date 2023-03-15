/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/store";
import { selectUser } from "../redux/features/auth/authSlice";
import { me } from "../redux/features/auth/thunkActions";

export default function useMeAuth() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      dispatch(me())
        .unwrap()
        .catch((err) => {})
        .finally(() => setIsLoading(false));
    }

    if (!user.email) {
      setIsLoading(true);
      fetchUser();
    }
  }, []);

  return {
    user,
    isLoading,
  };
}

import React from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/store";
import { selectUser } from "../../redux/features/auth/authSlice";
import { logout } from "../../redux/features/auth/thunkActions";

function ProfilePage() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  return (
    <div>
      <h1>Profile</h1>
      <div>{user.email}</div>
      <button type="button" onClick={() => dispatch(logout())}>
        log out
      </button>
    </div>
  );
}

export default ProfilePage;

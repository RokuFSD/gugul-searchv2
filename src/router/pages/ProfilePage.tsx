import React from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/store";
import { selectUser } from "../../redux/features/auth/authSlice";
import { logout } from "../../redux/features/auth/thunkActions";
import ProfileCard from "../../components/cards/ProfileCard";
import * as Menu from "../../components/menu";

function ProfilePage() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  return (
    <div>
      <Menu.MenuOpen />
      <Menu.Menu>
        <Menu.MenuList>
          <Menu.MenuItem>Analytics</Menu.MenuItem>
          <Menu.MenuItem>
            <button
              className="w-full text-start"
              type="button"
              onClick={() => dispatch(logout())}
            >
              log out
            </button>
          </Menu.MenuItem>
          <Menu.MenuItem>Delete Account</Menu.MenuItem>
        </Menu.MenuList>
      </Menu.Menu>
      <ProfileCard
        email={user.email}
        name={user.name}
        pictureSrc={user.picture}
      />
    </div>
  );
}

export default ProfilePage;

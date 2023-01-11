import React from "react";
import { Outlet } from "react-router-dom";
import { logout } from "../../redux/features/auth/thunkActions";
import { selectUser } from "../../redux/features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/store";

import * as Menu from "../../components/menu";
import ProfileCard from "../../components/cards/ProfileCard";
import ProfileMenuList from "../../components/navbar/ProfileNav/ProfileMenuList";
import FavoriteContainer from "../../components/favorites/FavoriteContainer";

function ProfilePage() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  return (
    <div>
      <Menu.MenuOpen />
      <Menu.Menu>
        <Menu.MenuList>
          <ProfileMenuList />
          <Menu.MenuItem>
            <button
              className="w-full text-start h-full"
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
      <FavoriteContainer>
        <Outlet />
      </FavoriteContainer>
    </div>
  );
}

export default ProfilePage;

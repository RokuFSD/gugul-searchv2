import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/thunkActions";
import { selectUser } from "../../redux/features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/store";

import * as Menu from "../../components/menu";
import ProfileCard from "../../components/cards/ProfileCard";
import ProfileMenuList from "../../components/navbar/ProfileNav/ProfileMenuList";
import FavoriteContainer from "../../components/favorites/FavoriteContainer";
import Logo from "../../components/header/Logo";

function ProfilePage() {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  return (
    <div>
      <Menu.MenuOpen />
      <Menu.Menu>
        <Menu.MenuList>
          <Logo onNav/>
          <ProfileMenuList />
          <Menu.MenuItem>
            <button
              className="w-full text-start h-full"
              type="button"
              onClick={() => {
                dispatch(logout()).unwrap().then(() => navigate("/"));
              }}
            >
              log out
            </button>
          </Menu.MenuItem>
        </Menu.MenuList>
      </Menu.Menu>
      <ProfileCard
        email={user.email}
        name={user.name}
        pictureSrc={user.picture}
      />
      <div className="lg:pl-64 py-4">
        <FavoriteContainer>
          <Outlet />
        </FavoriteContainer>
      </div>
    </div>
  );
}

export default ProfilePage;

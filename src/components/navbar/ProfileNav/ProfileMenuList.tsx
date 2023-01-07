import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import * as Menu from "../../menu";
import { PrivateRoutes } from "../../../models/routes";

const styles = "w-full h-full flex items-center";

type ProfileMenuProps = {
  inner: string;
  to: string;
};

function ProfileMenuLink({ inner, to }: ProfileMenuProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${styles} text-blue-400 font-semibold` : `${styles}`
      }
    >
      {inner}
    </NavLink>
  );
}

function ProfileMenuList() {
  return (
    <>
      <Menu.MenuItem>
        <ProfileMenuLink inner="Home" to={PrivateRoutes.HOME} />
      </Menu.MenuItem>
      <Menu.MenuItem>
        <ProfileMenuLink inner="Videos" to={PrivateRoutes.VIDEOS} />
      </Menu.MenuItem>
      <Menu.MenuItem>
        <ProfileMenuLink inner="Gifs" to={PrivateRoutes.GIFS} />
      </Menu.MenuItem>
      <Menu.MenuItem>
        <ProfileMenuLink inner="News" to={PrivateRoutes.NEWS} />
      </Menu.MenuItem>
    </>
  );
}

export default memo(ProfileMenuList);

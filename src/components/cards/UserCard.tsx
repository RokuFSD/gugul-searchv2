import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/store";
import { isAnyUser, userImage } from "../../redux/features/auth/authSlice";
import { PublicRoutes } from "../../models/routes";

function UserCard() {
  const user = useAppSelector(isAnyUser);
  const image = useAppSelector(userImage);
  return (
    <div className="flex block order-1 md:absolute right-8 lg:right-20 items-center md:h-14">
      {!user ? (
        <Link
          to={PublicRoutes.LOGIN}
          className="transition-colors block w-20 h-10 bg-blue-300 rounded-lg flex items-center justify-center hover:bg-blue-400 hover:shadow-lg"
        >
          Sign In
          {/* Person SVG  */}
        </Link>
      ) : (
        <Link to="/profile" className="">
          <picture>
            <source srcSet={image} type="image/webp" />
            <img
              src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              alt="user placeholder"
              className="w-12 h-12 rounded-full mx-auto"
            />
          </picture>
        </Link>
      )}
    </div>
  );
}

export default memo(UserCard);

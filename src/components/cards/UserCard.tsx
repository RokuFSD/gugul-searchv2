import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/store";
import { selectUser } from "../../redux/features/auth/authSlice";

function UserCard() {
  const user = useAppSelector(selectUser);
  return (
    <div className="flex block order-1 md:absolute right-8 lg:right-32 items-center md:h-14">
      {!user.email ? (
        <Link to="/auth" className="">
          {/* Person SVG  */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Link>
      ) : (
        <Link to="/profile" className="">
          Profile
        </Link>
      )}
    </div>
  );
}

export default UserCard;

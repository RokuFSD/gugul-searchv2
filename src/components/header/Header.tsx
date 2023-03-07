import React, { memo, ReactNode } from "react";
import UserCard from "../cards/UserCard";
import Logo from "./Logo";

type HeaderProps = {
  children: ReactNode;
  triggeredSearch: boolean;
};

function Header({ children, triggeredSearch }: HeaderProps) {
  return (
    <div
      className={`w-full flex flex-wrap px-2 overflow-hidden md:gap-4 xl:px-52 relative ${
        triggeredSearch
          ? "mx-auto h-60 lg:m-0 lg:pl-10 border-b border-b-blue-300 shadow-md justify-end md:justify-start pt-2 md:h-44"
          : "p-4 justify-end"
      }`}
    >
      {children}
      <UserCard />
    </div>
  );
}

export default memo(Header);

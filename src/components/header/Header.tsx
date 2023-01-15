import React, { memo, ReactNode } from "react";
import UserCard from "../cards/UserCard";

type HeaderProps = {
  children: ReactNode;
  triggeredSearch: boolean;
};

function Header({ children, triggeredSearch }: HeaderProps) {
  return (
    <div
      className={`w-full flex flex-wrap px-4 overflow-hidden md:gap-4 xl:px-52 relative ${
        triggeredSearch
          ? "mx-auto h-40 lg:m-0 lg:pl-10 border-b border-b-blue-300 shadow-md justify-end md:justify-start pt-2 md:pt-10"
          : "h-20 p-4 justify-end"
      }`}
    >
      {children}
      <UserCard />
    </div>
  );
}

export default memo(Header);

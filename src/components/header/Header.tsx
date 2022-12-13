import React, { ReactNode } from "react";

type HeaderProps = {
  children: ReactNode;
  triggeredSearch: boolean;
};

function Header({ children, triggeredSearch }: HeaderProps) {
  return (
    <div
      className={`w-full flex flex-col gap-2 px-4 h-36 col-span-full  
    ${
      triggeredSearch
        ? "mx-auto pt-10 lg:m-0 lg:pl-10 border-b border-b-neutral-400 shadow-md"
        : "place-self-center row-span-full"
    }`}
    >
      {children}
    </div>
  );
}

export default Header;

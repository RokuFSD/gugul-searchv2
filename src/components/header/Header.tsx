import React, { memo, ReactNode } from "react";
import UserCard from "../cards/UserCard";
import classSelector from "../../utils/classSelector";

type HeaderProps = {
  children: ReactNode;
  triggeredSearch: boolean;
};

const baseStyles = [
  "w-full",
  "flex",
  "flex-wrap",
  "px-2",
  "overflow-hidden",
  "md:gap-4",
  "xl:px-52",
  "relative"
];

const variants = {
  searched: [
    "mx-auto",
    "h-60",
    "lg:m-0",
    "lg:pl-10",
    "border-b",
    "border-b-blue-300",
    "shadow-md",
    "justify-end",
    "md:justify-start",
    "pt-2",
    "md:h-52",
    "xl:h-36"
  ],
  idle: [
    "p-4",
    "justify-end",
    "h-20"
  ]
};

function Header({ children, triggeredSearch }: HeaderProps) {
  const classes = classSelector(baseStyles, variants);
  return (
    <div
      className={classes(triggeredSearch ? "searched" : "idle")}
    >
      {children}
      <UserCard />
    </div>
  );
}

export default memo(Header);

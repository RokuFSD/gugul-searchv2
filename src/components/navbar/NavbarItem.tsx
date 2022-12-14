import React from "react";
import { NavLink } from "react-router-dom";
import { useSearchContext } from "../../context/SearchContext";

type NavbarItemProps = {
  name: string;
  path: string;
};

function NavbarItem({ path, name }: NavbarItemProps) {
  const { context } = useSearchContext();
  let pathWithQuery = path;
  if (context.query) {
    pathWithQuery = `${pathWithQuery}?q=${context.query}&page=${context.page}`;
  }
  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-blue-300 transition-color font-medium relative"
            : "hover:text-blue-200 relative font-medium"
        }
        to={pathWithQuery}
      >
        {({ isActive }) =>
          isActive ? (
            <span
              className="after:block after:w-1.5 after:h-1.5 after:bg-blue-400 after:rounded-full after:left-1/2 after:absolute after:-translate-x-1/2">
              {name}
            </span>
          ) : (
            <span>{name}</span>
          )
        }
      </NavLink>
    </li>
  );
}

export default NavbarItem;

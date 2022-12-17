import React, { memo } from "react";
import NavbarItem from "./NavbarItem";

const links = [
  { name: "Search", path: "/search/all" },
  { name: "News", path: "/search/news" },
  { name: "GIFs", path: "/search/gifs" },
  { name: "Videos", path: "/search/videos" },
];

function Navbar() {
  return (
    <nav className="w-full max-w-xl">
      <ul className="flex w-full justify-between">
        {links.map((link) => (
          <NavbarItem key={link.name} name={link.name} path={link.path} />
        ))}
      </ul>
    </nav>
  );
}

export default memo(Navbar);

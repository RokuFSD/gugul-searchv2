import React, { ReactNode, useEffect, useRef } from "react";
import { motion } from "framer-motion";

type MenuListProps = {
  children: ReactNode;
};

const variants = {
  show: {
    opacity: 1,
    transition: {
      delay: 0.6,
      staggerChildren: 0.5,
      when: "beforeChildren"
    }
  },
  hide: {
    opacity: 0,
    transition: {
      staggerChildren: 0.5,
      when: "afterChildren"
    }
  }
};

function MenuList({ children }: MenuListProps) {
  const openOnce = () => localStorage.getItem("menu");

  useEffect(() => {
    localStorage.setItem("menu", "true");
  }, []);

  return (
    <nav>
      <motion.ul
        variants={variants}
        initial={openOnce() ? false : "hide"}
        animate="show"
        className="flex flex-col gap-4 w-64 px-6"
      >
        {children}
      </motion.ul>
    </nav>
  );
}

export default MenuList;

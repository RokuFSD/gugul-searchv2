import React, { ReactNode } from "react";
import { motion } from "framer-motion";

type MenuListProps = {
  children: ReactNode;
};

const variants = {
  show: {
    opacity: 1,
    transition: {
      delay: 1,
      staggerChildren: 0.5,
      when: "beforeChildren",
    },
  },
  hide: {
    opacity: 0,
    transition: {
      staggerChildren: 0.5,
      when: "afterChildren",
    },
  },
};

function MenuList({ children }: MenuListProps) {
  return (
    <motion.ul
      variants={variants}
      initial="hide"
      animate="show"
      className="flex flex-col gap-4 w-64 px-6"
    >
      {children}
    </motion.ul>
  );
}

export default MenuList;

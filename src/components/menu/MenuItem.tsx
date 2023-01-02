import React, { ReactNode } from "react";
import { motion } from "framer-motion";

type MenuItemProps = {
  children: ReactNode | string;
};

const item = {
  show: {
    opacity: 1,
    x: 0,
  },
  hide: {
    opacity: 0,
    x: -70,
  },
};

function MenuItem({ children }: MenuItemProps) {
  return (
    <motion.li
      layout
      variants={item}
      className="z-50 overflow-hidden relative h-10 flex rounded-lg items-center px-2 bg-gray-900 cursor-pointer bg-opacity-50"
      whileHover={{
        y: -4,
        boxShadow: "0 2px 0 rgba(52, 129, 209, 0.8)",
      }}
    >
      {children}
    </motion.li>
  );
}

export default MenuItem;

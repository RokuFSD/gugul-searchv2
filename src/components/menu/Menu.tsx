/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toggleState from "../../services/toggleState";
import MenuClose from "./MenuClose";
import useMediaQuery from "../../hooks/useMediaQuery";

function handleKey(e: React.KeyboardEvent) {
  if (e.key === "Escape") {
    toggleState.setSubject(true);
  }
}

type MenuProps = {
  children: ReactNode;
};

function Menu({ children }: MenuProps) {
  const subscription = toggleState.getSubject();
  const matchMediaQuery = useMediaQuery("(min-width: 1024px)");
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  subscription.subscribe((value) => {
    if (value) {
      setIsOpen((prevState) => !prevState);
    }
  });

  useEffect(() => {
    if (!matchMediaQuery && isOpen && menuRef.current) {
      menuRef.current.focus();
    }
    if (matchMediaQuery) {
      setIsOpen(true);
    }
  }, [isOpen, matchMediaQuery]);

  return (
    // Overlay
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          ref={menuRef}
          initial={!matchMediaQuery ? { opacity: 0 } : { opacity: 1 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.2 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.2, delay: 0.5 },
          }}
          className="w-full h-full absolute z-20 bg-black bg-opacity-60 lg:w-auto lg:inset-y-0 lg:bg-gray-700 lg:bg-opacity-0"
          tabIndex={-1}
          onKeyDown={handleKey}
          onClick={() => toggleState.setSubject(true)}
          role="button"
        >
          {/* Menu */}
          <motion.section
            layout
            initial={!matchMediaQuery ? { opacity: 0, x: -200 } : {}}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.5, delay: 0.2 },
            }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ duration: 0.5 }}
            className="inset-y-0 fixed h-full bg-gray-700 w-64 z-40 cursor-default flex justify-center py-40 md:w-80 lg:w-64 lg:bg-gray-800"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <MenuClose />
            {children}
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default Menu;

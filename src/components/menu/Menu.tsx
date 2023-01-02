/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toggleState from "../../services/toggleState";
import MenuClose from "./MenuClose";

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
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  subscription.subscribe((value) => {
    if (value) {
      setIsOpen((prevState) => !prevState);
    }
  });

  useEffect(() => {
    if (isOpen && menuRef.current) {
      menuRef.current.focus();
    }
  }, [isOpen]);

  return (
    // Overlay
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.2 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.2, delay: 0.5 },
          }}
          className="w-full h-full absolute z-20 bg-black bg-opacity-60"
          tabIndex={-1}
          onKeyDown={handleKey}
          onClick={() => toggleState.setSubject(true)}
          role="button"
        >
          {/* Menu */}
          <motion.section
            layout
            initial={{ opacity: 0, x: -200 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.5, delay: 0.2 },
            }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ duration: 0.5 }}
            className="relative h-full bg-gray-700 w-64 z-40 cursor-default flex justify-center py-40"
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

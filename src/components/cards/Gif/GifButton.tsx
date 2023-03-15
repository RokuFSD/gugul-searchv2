import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import { motion } from "framer-motion";

// Get props of motion.button
type MotionButtonProps = ComponentPropsWithoutRef<typeof motion.button>;

type GifButtonProps = { children: ReactNode } & MotionButtonProps

function GifButton({ children, ...props }: GifButtonProps) {
  return (
    <motion.button
      className="overflow-hidden bg-green-300 rounded-full w-12 h-12 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 flex items-center justify-center"
      type="button"
      animate={{ backgroundColor: "rgb(134 239 172)" }}
      whileFocus={{
        backgroundColor: ["#50da50", "#91d08a"],
        transition: {
          duration: 1,
          repeatType: "reverse",
          repeat: Infinity
        }
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}>
      {children}
    </motion.button>
  );
}

export default GifButton;
/* eslint-disable react/require-default-props */
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

type SubmitProps = {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
};

const variants = {
  idle: {
    backgroundColor: "transparent",
  },
  loading: {
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
  error: {
    scale: 1,
    backgroundColor: "#f56565",
    width: "6rem",
  },
};

function FormSubmit({ disabled, className, children }: SubmitProps) {
  return (
    <motion.button
      layout
      type="submit"
      disabled={disabled}
      variants={variants}
      animate={disabled ? "error" : "lorem"}
      transition={{
        duration: 0.4,
      }}
      className={className}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

export default FormSubmit;

/* eslint-disable react/require-default-props */
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

type SubmitProps = {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
};

function FormSubmit({ disabled, className, children }: SubmitProps) {
  return (
    <motion.button
      layout
      type="submit"
      disabled={disabled}
      className={className}
      whileTap={{ scale: 0.98, transition: { duration: 0.02 } }}
    >
      {children}
    </motion.button>
  );
}

export default FormSubmit;

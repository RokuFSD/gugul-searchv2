/* eslint-disable react/require-default-props */
import React, { ReactNode } from "react";

type SubmitProps = {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
};

function FormSubmit({ disabled, className, children }: SubmitProps) {
  return (
    <button type="submit" className={className} disabled={disabled}>
      {children}
    </button>
  );
}

export default FormSubmit;

import React, { ReactNode } from "react";

type AuthContainerProps = {
  children: ReactNode
}

function AuthContainer({ children }: AuthContainerProps) {
  return (
    <div className="flex w-full flex-wrap justify-center gap-2">
      <h2
        className="relative w-full text-center font-bold after:w-1/3 after:h-1 after:bg-slate-600 after:content-[''] after:block after:absolute after:top-1/2 after:left-2 after:-translate-y-1/2
        before:w-1/3 before:h-1 before:bg-slate-600 before:content-[''] before:block before:absolute before:top-1/2 before:right-2 before:-translate-y-1/2
        "> or </h2>
      {children}
    </div>
  );
}

export default AuthContainer;
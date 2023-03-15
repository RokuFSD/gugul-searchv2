import React, { ReactNode } from "react";

type FavoriteContainerProps = {
  children: ReactNode;
};

function FavoriteContainer({ children }: FavoriteContainerProps) {
  return (
    <section className="w-full flex flex-wrap justify-center gap-y-4 gap-x-12 xl:px-12 2xl:px-20 xl:justify-start">
      {children}
    </section>
  );
}

export default FavoriteContainer;

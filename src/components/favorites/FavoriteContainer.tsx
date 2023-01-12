import React, { ReactNode } from "react";

type FavoriteContainerProps = {
  children: ReactNode;
};

function FavoriteContainer({ children }: FavoriteContainerProps) {
  return (
    <section className="w-full flex flex-wrap gap-x-12 gap-y-4 lg:pl-64">
      {children}
    </section>
  );
}

export default FavoriteContainer;

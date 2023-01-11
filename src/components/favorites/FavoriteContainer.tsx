import React, { ReactNode } from "react";

type FavoriteContainerProps = {
  children: ReactNode;
};

function FavoriteContainer({ children }: FavoriteContainerProps) {
  return <section className="lg:pl-64">{children}</section>;
}

export default FavoriteContainer;

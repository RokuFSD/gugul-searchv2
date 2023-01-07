import React, { ReactNode } from "react";

type FavoriteContainerProps = {
  children: ReactNode;
};

function FavoriteContainer({ children }: FavoriteContainerProps) {
  return <section>{children}</section>;
}

export default FavoriteContainer;

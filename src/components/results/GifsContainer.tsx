import React from "react";
import useGifs from "../../hooks/useGifs";
import { useSearchContext } from "../../context/SearchContext";

function GifsContainer() {
  const {
    context: { query },
  } = useSearchContext();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGifs(query);

  return (
    <div>
      <p>Estoy en el contenedor de gifs</p>
    </div>
  );
}

export default GifsContainer;

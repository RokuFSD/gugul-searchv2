import React from "react";
import useGifs from "../../hooks/useGifs";
import { useSearchContext } from "../../context/SearchContext";
import GifCard from "../cards/GifCard";

function GifsContainer() {
  const {
    context: { query },
  } = useSearchContext();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGifs(query);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // TODO: Add a loading spinner when fetching next page
  return (
    <div className="flex w-full flex-wrap gap-4 justify-start p-4 lg:px-12 xl:px-32">
      {data?.pages.map((page) =>
        page.data.map((gif) => <GifCard key={gif.id} gif={gif} />)
      )}
    </div>
  );
}

export default GifsContainer;

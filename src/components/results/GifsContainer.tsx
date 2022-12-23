import React, { useMemo, useRef } from "react";
import useGifs from "../../hooks/useGifs";
import GifCard from "../cards/GifCard";
import useIntersectionObserver from "../../hooks/useInScreen";
import { useSearchContext } from "../../context/SearchContext";

function GifsContainer() {
  const ref = useRef(null);
  const {
    context: { query },
  } = useSearchContext();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInitialLoading,
  } = useGifs(query);

  const inScreen = useIntersectionObserver(ref);

  const pages = useMemo(() => data?.pages, [data]);

  function fetchNext() {
    fetchNextPage();
  }

  if (inScreen && hasNextPage && !isFetchingNextPage) {
    fetchNext();
  }

  return (
    <section className="flex flex-col py-6">
      {isInitialLoading ? (
        // TODO: Make this a skeleton
        <div>Cllado bvooboboooooo</div>
      ) : (
        <div className="flex w-full max-w-7xl mx-auto flex-wrap justify-center p-4 md:px-12 xl:px-32 gap-10">
          {pages?.map((page) =>
            page.data.map((gif) => <GifCard key={gif.id} gif={gif} />)
          )}
        </div>
      )}

      <button
        ref={ref}
        type="button"
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNext()}
        className="border-2 transition-colors rounded mx-auto w-40 h-14 hover:bg-gray-200 hover:text-neutral-700 active:bg-gray-300 active:text-neutral-700"
      >
        Load more
      </button>
      {isFetchingNextPage && <div>Loading...</div>}
    </section>
  );
}

export default GifsContainer;

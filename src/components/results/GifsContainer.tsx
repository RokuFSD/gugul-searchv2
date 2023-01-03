import React, { useMemo, useRef } from "react";
import { useSearchContext } from "../../context/SearchContext";
import useGifs from "../../hooks/useGifs";
import GifCard from "../cards/Gif/GifCard";
import SearchLoader from "../placeholders/SearchLoader";
import NoResults from "../placeholders/NoResults";
import useIntersectionObserver from "../../hooks/useInScreen";

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

  if (inScreen && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  if (pages && pages[0]?.data?.length === 0) {
    return <NoResults />;
  }

  return (
    <section className="flex flex-col py-6">
      {isInitialLoading ? (
        <SearchLoader />
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
        onClick={() => fetchNextPage()}
        className={`${
          (isInitialLoading || !hasNextPage) && "hidden"
        } border-2 transition-colors rounded mx-auto w-40 h-14 hover:bg-gray-200 hover:text-neutral-700 active:bg-gray-300 active:text-neutral-700`}
      >
        Load more
      </button>
      {isFetchingNextPage && <div>Loading...</div>}
    </section>
  );
}

export default GifsContainer;

import { useInfiniteQuery } from "@tanstack/react-query";
import Gifs from "../services/Gifs";

function useGifs(q: string) {
  Gifs.query = q;
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["gifs", q],
      ({ pageParam = 0 }) => Gifs.search({ offset: pageParam }),
      {
        getNextPageParam: (lastPage, allPages) => {
          const {
            total_count: totalCount,
            count,
            offset,
          } = lastPage.pagination;
          const totalPages = totalCount / count;
          return totalPages >= offset - 25 ? offset + 25 : undefined;
        },
      }
    );

  return { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage };
}

export default useGifs;

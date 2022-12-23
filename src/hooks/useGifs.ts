import { useInfiniteQuery } from "@tanstack/react-query";
import Gifs from "../services/Gifs";

function useGifs(q: string) {
  Gifs.query = q;
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInitialLoading,
  } = useInfiniteQuery(
    ["gifs", q],
    ({ pageParam = 0 }) => Gifs.search({ offset: pageParam }),
    {
      staleTime: Infinity,
      getNextPageParam: (lastPage, allPages) => {
        const { total_count: totalCount, count, offset } = lastPage.pagination;
        const totalPages = totalCount / count;
        const currentPage = offset / count + 1;
        if (currentPage < totalPages) {
          return currentPage * count;
        }
        return undefined;
      },
    }
  );

  return {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInitialLoading,
  };
}

export default useGifs;

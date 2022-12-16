import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import Search from "../services/Search";

type UseSearchProps = {
  type?: string;
  query: string;
  page: number;
}

function useSearch({ type, query, page }: UseSearchProps) {
  const queryClient = useQueryClient();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["search", type, query, page],
    queryFn: () => Search.search(query, type || "", page),
    keepPreviousData: true,
    staleTime: Infinity
  });

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["search", type, query, page + 1],
      queryFn: () => Search.search(query, type || "", page + 1),
      staleTime: Infinity
    });
  }, [queryClient, type, query, page]);

  return { data, isLoading, isSuccess };
}

export default useSearch;

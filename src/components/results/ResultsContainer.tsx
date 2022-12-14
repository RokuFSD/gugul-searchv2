import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchContext } from "../../context/SearchContext";
import Search from "../../services/Search";
import MainSection from "./MainSection";
import LocalMap from "./LocalMap";
import Paginator from "../paginator/Paginator";
import AsideSection from "./AsideSection";

function ResultsContainer() {
  const queryClient = useQueryClient();
  const { context } = useSearchContext();
  const { type } = useParams();
  const { query, page } = context;
  const { data, isLoading } = useQuery({
    queryKey: ["search", type, query, page],
    queryFn: () => Search.search(query, page),
    keepPreviousData: true,
    staleTime: Infinity
  });

  // Prefetch next page
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["search", type, query, page + 1],
      queryFn: () => Search.search(query, page + 1)
    });
  }, [queryClient, type, query, page]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-col gap-8 px-2 py-4 col-span-full w-full mx-auto lg:px-12 xl:px-52 2xl:px-64">
      {data?.data?.local_map && <LocalMap data={data.data.local_map} />}
      <div className="flex flex-col w-full gap-10 lg:flex-row lg:justify-between">
        <MainSection data={data?.data?.organic_results || []} />
        {data?.data?.knowledge_graph && <AsideSection data={data?.data?.knowledge_graph} />}
      </div>
      {data?.data?.serpapi_pagination && <Paginator data={data?.data?.serpapi_pagination} />}
    </section>
  );
}

export default ResultsContainer;

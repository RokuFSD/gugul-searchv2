import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSearchContext } from "../../context/SearchContext";
import Search from "../../services/Search";

function ResultsContainer() {
  const { context } = useSearchContext();
  const { type } = useParams();
  const { query } = context;
  const { data, isLoading } = useQuery({
    queryKey: ["search", type, query],
    queryFn: () => Search.search(query),
    keepPreviousData: true
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section>{query}</section>
  );
}

export default ResultsContainer;

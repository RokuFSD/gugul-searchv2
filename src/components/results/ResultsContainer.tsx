import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSearchContext } from "../../context/SearchContext";
import Search from "../../services/Search";
import MainSection from "./MainSection";
import LocalMap from "./LocalMap";

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

  console.log(data?.data.organic_results);

  return (
    <section className="flex flex-col gap-8 px-2 py-4 col-span-full md:px-10">
      {data?.data.local_map && <LocalMap data={data.data.local_map}/>}
      <MainSection data={data?.data.organic_results || []} />
    </section>
  );
}

export default ResultsContainer;

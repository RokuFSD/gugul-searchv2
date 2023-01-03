import React from "react";
import { useParams } from "react-router-dom";
import { useSearchContext } from "../../context/SearchContext";
import MainSection from "./sections/MainSection";
import LocalMap from "./sections/LocalMap";
import Paginator from "../paginator/Paginator";
import AsideSection from "./aside/AsideSection";
import componentSelector from "../../utils/components";
import useSearch from "../../hooks/useSearch";
import SearchLoader from "../placeholders/SearchLoader";
import NoResults from "../placeholders/NoResults";

enum SearchKey {
  "all" = "organic_results",
  "news" = "news_results",
  "videos" = "video_results",
}

function ResultsContainer() {
  const { context } = useSearchContext();
  const { type } = useParams();
  const { query, page } = context;
  const { data, isLoading } = useSearch({ type, query, page });

  const results =
    data?.data[SearchKey[type as keyof typeof SearchKey] || "organic_results"];
  const element = componentSelector(type || "all");

  if (isLoading) {
    return (
      <div>
        <SearchLoader />
      </div>
    );
  }

  if (results && results.length === 0) {
    return <NoResults />;
  }

  return (
    <section className="h-full flex flex-col gap-8 px-2 py-4 col-span-full w-full mx-auto lg:px-12 xl:px-52">
      {data?.data?.local_map && <LocalMap data={data.data.local_map} />}
      <div className="flex flex-col w-full gap-10 lg:flex-row xl:gap-52">
        <MainSection data={results || []} element={element} />
        {data?.data?.knowledge_graph && (
          <AsideSection data={data?.data?.knowledge_graph} />
        )}
      </div>
      {data?.data?.serpapi_pagination && (
        <Paginator data={data?.data?.serpapi_pagination} />
      )}
    </section>
  );
}

export default ResultsContainer;

import React from "react";
import { useSearchContext } from "../../context/SearchContext";

type NoResultsProps = {
  // eslint-disable-next-line react/require-default-props
  from?: "search" | "favorites";
};

function NoResults({ from = "search" }: NoResultsProps) {
  const {
    context: { query },
  } = useSearchContext();
  return (
    <div className="flex flex-col items-center justify-center h-full justify-center w-full py-32">
      <h1 className="text-2xl font-bold text-gray-500">
        {from === "search"
          ? `There is no results for ${query}`
          : "Oops! nothing here..."}
      </h1>
    </div>
  );
}

export default NoResults;

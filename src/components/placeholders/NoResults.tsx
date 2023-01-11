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
          : "Oops! nothing here!"}
      </h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 10l7-7m0 0l-7 7m7-7v18m-4-4h10"
        />
      </svg>
    </div>
  );
}

export default NoResults;

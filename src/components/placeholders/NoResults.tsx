import React from "react";
import { useSearchContext } from "../../context/SearchContext";

function NoResults() {
  const {
    context: { query },
  } = useSearchContext();
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold text-gray-500">
        No se encontraron resultados para {query}
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

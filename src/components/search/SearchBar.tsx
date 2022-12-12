import React from "react";
import { useSearchParams } from "react-router-dom";
import {
  useSearchContext,
  useSearchContextAction,
} from "../../context/SearchContext";

function SearchBar() {
  const { query } = useSearchContext();
  const setQuery = useSearchContextAction();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q");

  return (
    <input
      type="search"
      placeholder="Search something..."
      className="w-full h-14 px-8 transition-shadow bg-transparent border rounded-full focus:outline-none focus:border-blue-200 focus:shadow-xl text-lg"
      name="q"
      value={query || initialQuery || ""}
      role="searchbox"
      onChange={(e) => setQuery(e.currentTarget.value)}
    />
  );
}

export default SearchBar;

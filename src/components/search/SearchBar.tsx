import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useSearchContext,
  useSearchContextAction,
} from "../../context/SearchContext";

function SearchBar() {
  const [touched, isTouched] = useState(false);
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
      value={touched ? query : initialQuery || ""}
      role="searchbox"
      onChange={(e) => setQuery(e.currentTarget.value)}
      onFocus={() => isTouched(true)}
    />
  );
}

export default SearchBar;

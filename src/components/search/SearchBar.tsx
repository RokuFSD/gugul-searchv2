import React, { useRef } from "react";
import { useSearchContext } from "../../context/SearchContext";

function SearchBar() {
  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const { context } = useSearchContext(inputRef);

  return (
    <input
      ref={inputRef}
      type="search"
      placeholder="Search something..."
      className="w-full max-w-xl h-14 px-6 transition-shadow bg-transparent border-2 border-neutral-300 rounded-full focus:outline-none focus:border-blue-200 focus:shadow-xl text-lg"
      name="q"
      defaultValue={context.query}
      role="searchbox"
    />
  );
}

export default SearchBar;

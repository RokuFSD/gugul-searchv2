import React, { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSearchContextAction } from "../../context/SearchContext";

type SeachContainerProps = {
  triggeredSearch: boolean;
};

function SearchContainer({ triggeredSearch }: SeachContainerProps) {
  const [, setSearchParams] = useSearchParams();
  const setQuery = useSearchContextAction();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    ) as { q: string };
    setQuery(values.q);
    setSearchParams(values);
  }

  return (
    <div
      className={`w-full px-4 h-36 col-span-full  
    ${
      triggeredSearch
        ? "mx-auto pt-10 lg:m-0 lg:pl-10 border-b border-b-neutral-400 shadow-md"
        : "place-self-center row-span-full"
    }`}
    >
      <form onSubmit={handleSubmit} name="search">
        <SearchBar />
      </form>
    </div>
  );
}

export default SearchContainer;

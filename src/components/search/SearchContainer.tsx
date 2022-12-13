import React, { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSearchContextAction } from "../../context/SearchContext";

function SearchContainer() {
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
    <div className="w-72 md:w-96 lg:w-full lg:max-w-xl">
      <form onSubmit={handleSubmit} name="search">
        <SearchBar />
      </form>
    </div>
  );
}

export default SearchContainer;

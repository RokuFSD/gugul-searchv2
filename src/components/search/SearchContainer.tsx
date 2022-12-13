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
    if (values.q === "") return;
    setQuery(values.q);
    setSearchParams(values);
  }

  return (
    <form onSubmit={handleSubmit} name="search">
      <SearchBar />
    </form>
  );
}

export default SearchContainer;

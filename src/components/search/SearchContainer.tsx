import React, { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";

function SearchContainer() {
  const [, setSearchParams] = useSearchParams();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    ) as { q: string };
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

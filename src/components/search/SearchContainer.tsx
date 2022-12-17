import React, { FormEvent } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSearchContextAction } from "../../context/SearchContext";

function SearchContainer() {
  // TODO: Cancel the search when the input is the same as the current result
  const location = useLocation();
  const [, setQueryParams] = useSearchParams();
  const { setQuery } = useSearchContextAction();
  const navigate = useNavigate();
  const isRoot = location.pathname === "/";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    ) as { q: string };
    if (values.q === "") return;
    setQuery(values.q);
    if (isRoot) {
      navigate(`/search/all?q=${values.q}&page=1`);
      return;
    }
    setQueryParams((prev) => ({
      ...Object.fromEntries(prev.entries()),
      q: values.q,
    }));
  }

  return (
    <form onSubmit={handleSubmit} name="search">
      <SearchBar />
    </form>
  );
}

export default SearchContainer;

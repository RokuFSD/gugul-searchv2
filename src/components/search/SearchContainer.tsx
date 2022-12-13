import React, { FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSearchContextAction } from "../../context/SearchContext";

function SearchContainer() {
  const location = useLocation();
  const setQuery = useSearchContextAction();
  const navigate = useNavigate();
  const isRoot = location.pathname === "/";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    ) as { q: string };
    if (values.q === "") return;
    setQuery(values.q);
    navigate(
      isRoot
        ? `/search/all?q=${values.q}`
        : `${location.pathname}?q=${values.q}`
    );
  }

  return (
    <form onSubmit={handleSubmit} name="search">
      <SearchBar />
    </form>
  );
}

export default SearchContainer;

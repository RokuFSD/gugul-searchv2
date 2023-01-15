import React, { FormEvent, memo } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSearchContextAction } from "../../context/SearchContext";

type SearchContainerProps = {
  triggeredSearch: boolean;
};

function SearchContainer({ triggeredSearch }: SearchContainerProps) {
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
    <form
      onSubmit={handleSubmit}
      name="search"
      className={`${
        !triggeredSearch &&
        "absolute w-full top-1/2 -translate-y-1/2 justify-center px-4"
      } basis-full order-2 flex`}
    >
      <SearchBar />
    </form>
  );
}

export default memo(SearchContainer);

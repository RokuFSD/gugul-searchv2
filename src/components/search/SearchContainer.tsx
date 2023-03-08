import React, { FormEvent, memo } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSearchContextAction } from "../../context/SearchContext";
import Logo from "../header/Logo";

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
      q: values.q
    }));
  }

  return (
    <div
      className={`order-2 flex w-full basis-full items-center flex-col md:pt-12 md:items-start ${!triggeredSearch && "absolute top-1/2 -translate-y-1/2 md:items-center"}`}>
      <Logo triggeredSearch={triggeredSearch} />
      <form
        onSubmit={handleSubmit}
        name="search"
        className={`${
          !triggeredSearch &&
          "w-full justify-center px-4"
        } basis-full order-2 flex w-full items-center`}
      >
        <SearchBar />
      </form>
    </div>
  );
}

export default memo(SearchContainer);

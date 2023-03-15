import React from "react";
import { useSearchParams } from "react-router-dom";
import { ResponseType } from "../../types/api";
import {
  useSearchContext,
  useSearchContextAction
} from "../../context/SearchContext";

type PaginatorProps = {
  data: ResponseType["data"]["serpapi_pagination"];
};

function Paginator({ data }: PaginatorProps) {
  const otherPages = Object.keys(data?.other_pages);
  const { context } = useSearchContext();
  const { setPage } = useSearchContextAction();
  const [, setSearchParams] = useSearchParams();
  const totalPages = [...otherPages, `${data?.current}`].sort(
    (a, b) => parseInt(a, 10) - parseInt(b, 10)
  );

  function handleClick(page: string) {
    setPage(parseInt(page, 10));
    setSearchParams(
      (prev) =>
        new URLSearchParams({
          ...Object.fromEntries(prev),
          page
        })
    );
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center max-w-lg">
      <span className="block basis-full text-center text-3xl">
        G<span className="text-blue-300">uuuuuuuuuu</span>gul
      </span>
      {totalPages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => handleClick(page)}
          className={`${
            parseInt(page, 10) === context.page ? "text-blue-300" : ""
          } text-lg font-medium rounded-md focus:outline-none focus-visible:ring-2 hover:text-blue-200 transition-colors`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Paginator;

import React from "react";
import { AutoComplete } from "../../types/api";

type SearchAutoCompleteProps = {
  data: AutoComplete[];
};

function SearchAutoComplete({ data }: SearchAutoCompleteProps) {
  if (!data.length) return null;

  const content = data.map((result) => (
    <div role="option" aria-selected="false" tabIndex={-1} key={result.value}>
      {result.value}
    </div>
  ));

  return (
    <div
      id="search-autocomplete"
      role="listbox"
      aria-hidden="false"
      aria-multiselectable="false"
      className=" absolute z-50 bg-gray-700 w-full max-w-xl px-6 text-lg border-2 border-blue-200 rounded-2xl rounded-t-none top-3/4 border-t-0"
      tabIndex={-1}
    >
      {content}
    </div>
  );
}

export default SearchAutoComplete;

import React from "react";
import SearchContainer from "../../components/search/SearchContainer";
import { useSearchContext } from "../../context/SearchContext";

function SearchPage() {
  const { context } = useSearchContext();
  const searchTriggered = context.query !== "";

  if (searchTriggered) {
    return (
      <>
        <SearchContainer triggeredSearch={searchTriggered} />
        <h1>Searched {context.query}</h1>
      </>
    );
  }
  return <SearchContainer triggeredSearch={searchTriggered} />;
}

export default SearchPage;

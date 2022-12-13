import React from "react";
import SearchContainer from "../../components/search/SearchContainer";
import { useSearchContext } from "../../context/SearchContext";

function SearchPage() {
  const { context } = useSearchContext();
  const searchTriggered = context.query !== "";

  if (searchTriggered) {
    return (
      <>
        <h1>Searched</h1>
        <SearchContainer />
      </>
    );
  }
  return <SearchContainer />;
}

export default SearchPage;

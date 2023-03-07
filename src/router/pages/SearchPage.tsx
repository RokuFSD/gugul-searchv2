import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/SearchNav/Navbar";
import SearchContainer from "../../components/search/SearchContainer";
import { useSearchContext } from "../../context/SearchContext";

function SearchPage() {
  const { context } = useSearchContext();
  const searchTriggered = context.query !== "";

  if (!searchTriggered) {
    return (
      <>
        <Header triggeredSearch={searchTriggered}>
          {/* Refactor this div: Is used to fill the children prop requirement */}
          <div />
        </Header>
        <SearchContainer triggeredSearch={searchTriggered} />
      </>
    );
  }
  return (
    <>
      <Header triggeredSearch={searchTriggered}>
        <SearchContainer triggeredSearch={searchTriggered} />
        <Navbar />
      </Header>
      <Outlet />
    </>
  );
}

export default SearchPage;

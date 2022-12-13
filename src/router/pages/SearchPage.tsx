import React from "react";
import { Outlet } from "react-router-dom";
import SearchContainer from "../../components/search/SearchContainer";
import Header from "../../components/header/Header";
import { useSearchContext } from "../../context/SearchContext";
import Navbar from "../../components/navbar/Navbar";

function SearchPage() {
  const { context } = useSearchContext();
  const searchTriggered = context.query !== "";

  if (!searchTriggered) {
    return (
      <Header triggeredSearch={searchTriggered}>
        <SearchContainer />
      </Header>
    );
  }
  return (
    <>
      <Header triggeredSearch={searchTriggered}>
        <SearchContainer />
        <Navbar />
      </Header>
      <Outlet />
    </>
  );
}

export default SearchPage;

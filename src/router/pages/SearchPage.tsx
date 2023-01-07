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

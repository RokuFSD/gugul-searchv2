import React from "react";
import { Outlet } from "react-router-dom";
import { SearchContextProvider } from "./context/SearchContext";

function App() {
  return (

    <main className="w-full dark:bg-gray-700 text-white">
      <SearchContextProvider>
        <Outlet />
      </SearchContextProvider>
    </main>

  );
}

export default App;

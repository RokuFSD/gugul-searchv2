import React from "react";
import { Outlet } from "react-router-dom";
import { SearchContextProvider } from "./context/SearchContext";

function App() {
  return (
    <main className="w-full h-screen grid grid-rows-2 grid-cols-12 dark:bg-gray-700 text-white">
      <SearchContextProvider>
        <Outlet />
      </SearchContextProvider>
    </main>
  );
}

export default App;

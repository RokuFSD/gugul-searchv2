import React from "react";
import SearchContainer from "./components/search/SearchContainer";
import { SearchContextProvider } from "./context/SearchContext";

function App() {
  return (
    <main className="w-full h-screen grid place-items-center dark:bg-gray-700 text-white">
      <SearchContextProvider>
        <SearchContainer />
      </SearchContextProvider>
    </main>
  );
}

export default App;

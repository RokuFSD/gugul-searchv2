import React from "react";
import { SearchContextProvider } from "./context/SearchContext";
import SearchPage from "./router/pages/SearchPage";

function App() {
  return (
    <main className="w-full h-screen grid grid-rows-2 grid-cols-12 dark:bg-gray-700 text-white">
      <SearchContextProvider>
        <SearchPage />
      </SearchContextProvider>
    </main>
  );
}

export default App;

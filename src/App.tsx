import React from "react";
import { SearchContextProvider } from "./context/SearchContext";
import SearchPage from "./router/pages/SearchPage";

function App() {
  return (
    <main className="w-full h-screen grid place-items-center dark:bg-gray-700 text-white">
      <SearchContextProvider>
        <SearchPage />
      </SearchContextProvider>
    </main>
  );
}

export default App;

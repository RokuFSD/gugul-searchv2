import React from "react";
import { Outlet } from "react-router-dom";
import Modal from "react-modal";
import { SearchContextProvider } from "./context/SearchContext";

Modal.setAppElement("#modal-root");

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

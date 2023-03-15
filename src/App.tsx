import React from "react";
import Modal from "react-modal";
import { Outlet } from "react-router-dom";
import { SearchContextProvider } from "./context/SearchContext";
import useMeAuth from "./hooks/useMeAuth";

Modal.setAppElement("#modal-root");

function App() {
  // First check if there is a user session
  // TODO: The tests are not working on the new version
  const { isLoading } = useMeAuth();
  return (
    <main className="w-full dark:bg-gray-700 text-white">
      <SearchContextProvider>
        {isLoading ? null : <Outlet />}
      </SearchContextProvider>
    </main>
  );
}

export default App;

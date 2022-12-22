import React from "react";
import { Outlet } from "react-router-dom";
import Modal from "react-modal";
import { SearchContextProvider } from "./context/SearchContext";
import AuthContextProvider from "./context/AuthContext";

Modal.setAppElement("#modal-root");

function App() {
  return (
    <main className="w-full dark:bg-gray-700 text-white">
      <SearchContextProvider>
        <AuthContextProvider>
          <Outlet />
        </AuthContextProvider>
      </SearchContextProvider>
    </main>
  );
}

export default App;

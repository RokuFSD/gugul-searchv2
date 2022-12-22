import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SearchPage from "./pages/SearchPage";
import ResultsContainer from "../components/results/ResultsContainer";
import GifsContainer from "../components/results/GifsContainer";
import AuthPage from "./pages/AuthPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <SearchPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
        children: [
          {
            path: "/search/gifs",
            element: <GifsContainer />,
          },
          {
            path: "/search/:type",
            element: <ResultsContainer />,
          },
        ],
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
    ],
  },
];

export default createBrowserRouter(routes);

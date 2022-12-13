import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SearchPage from "./pages/SearchPage";
import ResultsContainer from "../components/results/ResultsContainer";

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
            path: "/search/:type",
            element: <ResultsContainer />,
          },
        ],
      },
    ],
  },
];

export default createBrowserRouter(routes);

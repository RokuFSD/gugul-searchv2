import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SearchPage from "./pages/SearchPage";

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
            element: <h1>Con pulpa sin pulpa</h1>,
          },
        ],
      },
    ],
  },
];

export default createBrowserRouter(routes);

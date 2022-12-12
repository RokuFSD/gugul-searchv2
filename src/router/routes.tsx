import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const routes = [
  {
    path: "/",
    element: <App />,
  },
];

export default createBrowserRouter(routes);

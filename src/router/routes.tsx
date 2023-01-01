import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import { AuthPage, SearchPage, ProfilePage } from "./pages";
import ResultsContainer from "../components/results/ResultsContainer";
import GifsContainer from "../components/results/GifsContainer";
import { PublicRoutes, PrivateRoutes } from "../models/routes";
import PrivateGuard from "./guards/PrivateGuard";

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
        path: PublicRoutes.SEARCH,
        element: <SearchPage />,
        children: [
          {
            path: `${PublicRoutes.SEARCH}/gifs`,
            element: <GifsContainer />,
          },
          {
            path: `${PublicRoutes.SEARCH}/:type`,
            element: <ResultsContainer />,
          },
        ],
      },
      {
        path: `${PublicRoutes.AUTH}`,
        element: <AuthPage />,
      },
      {
        path: `${PrivateRoutes.PROFILE}`,
        element: <Navigate to={PrivateRoutes.PRIVATE} replace />,
      },
      {
        element: <PrivateGuard />,
        path: PrivateRoutes.PRIVATE,
        children: [
          {
            index: true,
            element: <Navigate to={PrivateRoutes.PROFILE} replace />,
          },
          {
            path: PrivateRoutes.PROFILE,
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
];

export default createBrowserRouter(routes);

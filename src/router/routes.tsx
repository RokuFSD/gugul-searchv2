import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../models/routes";
import { ProfilePage, SearchPage, LoginPage, RegisterPage } from "./pages";

import App from "../App";
import PrivateGuard from "./guards/PrivateGuard";
import GifsContainer from "../components/results/GifsContainer";
import FavoriteResults from "../components/favorites/FavoriteResults";
import ResultsContainer from "../components/results/ResultsContainer";
import AuthGuard from "./guards/AuthGuard";

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
        element: <AuthGuard />,
        children: [
          {
            path: PublicRoutes.LOGIN,
            element: <LoginPage />,
          },
          {
            path: PublicRoutes.REGISTER,
            element: <RegisterPage />,
          },
        ],
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
            children: [
              {
                index: true,
                element: <Navigate to={PrivateRoutes.HOME} replace />,
              },
            ],
          },
          {
            path: `${PrivateRoutes.PROFILE}/:type`,
            element: <ProfilePage />,
            children: [{ index: true, element: <FavoriteResults /> }],
          },
        ],
      },
    ],
  },
];

export default createBrowserRouter(routes);

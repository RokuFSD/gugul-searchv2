import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../models/routes";

import App from "../App";
import PrivateGuard from "./guards/PrivateGuard";
import AuthGuard from "./guards/AuthGuard";
import SearchPage from "./pages/SearchPage";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const GifsContainer = lazy(() => import ("../components/results/GifsContainer"));
const ResultsContainer = lazy(() => import ("../components/results/ResultsContainer"));
const FavoriteResults = lazy(() => import("../components/favorites/FavoriteResults"));

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <SearchPage />
      },
      {
        path: PublicRoutes.SEARCH,
        element: <SearchPage />,
        children: [
          {
            path: `${PublicRoutes.SEARCH}/gifs`,
            element: <Suspense>
              <GifsContainer />
            </Suspense>
          },
          {
            path: `${PublicRoutes.SEARCH}/:type`,
            element: <Suspense>
              <ResultsContainer />
            </Suspense>
          }
        ]
      },
      {
        element: <AuthGuard />,
        children: [
          {
            path: PublicRoutes.LOGIN,
            element: <Suspense><LoginPage /></Suspense>
          },
          {
            path: PublicRoutes.REGISTER,
            element: <Suspense><RegisterPage /></Suspense>
          }
        ]
      },
      {
        path: `${PrivateRoutes.PROFILE}`,
        element: <Navigate to={PrivateRoutes.PRIVATE} replace />
      },
      {
        element: <PrivateGuard />,
        path: PrivateRoutes.PRIVATE,
        children: [
          {
            index: true,
            element: <Navigate to={PrivateRoutes.PROFILE} replace />
          },
          {
            path: PrivateRoutes.PROFILE,
            element: <Suspense><ProfilePage /></Suspense>,
            children: [
              {
                index: true,
                element: <Navigate to={PrivateRoutes.HOME} replace />
              }
            ]
          },
          {
            path: `${PrivateRoutes.PROFILE}/:type`,
            element: <Suspense><ProfilePage /></Suspense>,
            children: [{
              index: true, element: <Suspense>
                <FavoriteResults />
              </Suspense>
            }]
          }
        ]
      }
    ]
  }
];

export default createBrowserRouter(routes);

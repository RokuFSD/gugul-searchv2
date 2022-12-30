import React, { ReactNode } from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchContextProvider } from "../../context/SearchContext";
import GifsContainer from "./GifsContainer";
import { gifs } from "../../mocks/responseMocks";
import { IntersectionObserverMock } from "../../utils/testing/windowsProperties";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const router = createMemoryRouter([
  {
    path: "/",
    element: (
      <SearchContextProvider>
        <GifsContainer />
      </SearchContextProvider>
    ),
  },
]);

// Define Intersection Observer global
Object.defineProperty(window, "IntersectionObserver", IntersectionObserverMock);

describe("Results container", () => {
  it("Should render a state of loading", () => {
    render(<RouterProvider router={router} />, { wrapper });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("Should render the gifs grid", () => {
    render(<RouterProvider router={router} />, { wrapper });
    expect(screen.queryAllByTestId("gif-card")).toHaveLength(gifs.data.length);
  });
});

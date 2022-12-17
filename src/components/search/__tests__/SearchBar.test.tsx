import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import SearchBar from "../SearchBar";
import { SearchContextProvider } from "../../../context/SearchContext";

const router = createMemoryRouter(
  [
    {
      path: "/",
      element: (
        <SearchContextProvider>
          <SearchBar />
        </SearchContextProvider>
      ),
    },
  ],
  {
    initialEntries: ["/"],
  }
);

const routerWithQuery = createMemoryRouter(
  [
    {
      path: "/",
      element: (
        <SearchContextProvider>
          <SearchBar />
        </SearchContextProvider>
      ),
    },
  ],
  { initialEntries: ["/?q=initial"] }
);

describe("SearchBar component", () => {
  it("should change the input value", () => {
    render(<RouterProvider router={router} />);
    const input = screen.getByRole("searchbox");
    fireEvent.input(input, { target: { value: "Books" } });
    expect(input).toHaveValue("Books");
  });

  it("should render with the query from the url", () => {
    render(<RouterProvider router={routerWithQuery} />);
    const input = screen.getByRole("searchbox");
    expect(input).toHaveValue("initial");
  });
});

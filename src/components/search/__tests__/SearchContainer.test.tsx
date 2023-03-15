import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import SearchContainer from "../SearchContainer";
import { SearchContextProvider } from "../../../context/SearchContext";

const router = createMemoryRouter(
  [
    {
      path: "/",
      element: (
        <SearchContextProvider>
          <SearchContainer triggeredSearch />
        </SearchContextProvider>
      ),
    },
    {
      path: "/search/:type",
      element: (
        <SearchContextProvider>
          <div>
            Successfull search
            <SearchContainer triggeredSearch/>
          </div>
        </SearchContextProvider>
      ),
    },
  ],
  {
    initialEntries: ["/"],
  }
);

describe("Form submit", () => {
  it("should change the query params on submit", () => {
    render(<RouterProvider router={router} />);
    const input = screen.getByRole("searchbox");
    fireEvent.input(input, { target: { value: "test" } });
    fireEvent.submit(screen.getByRole("form"));
    expect(input).toHaveValue("test");
  });

  it("should navigate to the search results when is root", () => {
    router.navigate("/");
    render(<RouterProvider router={router} />);
    const input = screen.getByRole("searchbox");
    fireEvent.input(input, { target: { value: "test" } });
    fireEvent.submit(screen.getByRole("form"));
    const text = screen.getByText(/successfull search/i);
    expect(text).toBeInTheDocument();
  });

  it("should stay on the search results", () => {
    router.navigate("/search/other?q=other");
    render(<RouterProvider router={router} />);
    const input = screen.getByRole("searchbox");
    const text = screen.getByText(/successfull search/i);
    fireEvent.submit(screen.getByRole("form"));
    expect(input).toHaveValue("other");
    expect(text).toBeInTheDocument();
  });

  it("should not submit if the input is empty", () => {
    router.navigate("/");
    render(<RouterProvider router={router} />);
    const input = screen.getByRole("searchbox");
    fireEvent.submit(screen.getByRole("form"));
    expect(input).toHaveValue("");
    expect(screen.queryByText(/successfull search/i)).toBeNull();
  });
});

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import SearchContainer from "./SearchContainer";
import { SearchContextProvider } from "../../context/SearchContext";

const router = createMemoryRouter(
  [
    {
      path: "/",
      element: (
        <SearchContextProvider>
          <SearchContainer />
        </SearchContextProvider>
      )
    }
  ],
  {
    initialEntries: ["/"]
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
});

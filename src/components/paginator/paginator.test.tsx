import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { SearchContextProvider } from "../../context/SearchContext";
import Paginator from "./Paginator";
import { main } from "../../mocks/responseMocks";

const router = createMemoryRouter([
  {
    path: "/",
    element: (
      <SearchContextProvider>
        <Paginator data={main.serpapi_pagination} />
      </SearchContextProvider>
    ),
  },
]);

describe("Paginator component", () => {
  it("should render", () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
  });

  it("should change the page when a button is clicked", () => {
    render(<RouterProvider router={router} />);
    const button = screen.getByText("2");
    fireEvent.click(button);
    expect(button).toHaveClass("text-blue-300");
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AsideSection from "../AsideSection";
import { aside } from "../../../../mocks/responseMocks";

beforeEach(() => {
  Object.defineProperty(global, "scrollTo", { value: vitest.fn(), writable: true });
});

describe("AsideSection", () => {
  it("should render with the details closed", () => {
    render(<AsideSection data={aside.knowledge_graph} />);
    expect(screen.queryByRole("table")).toBeNull();
  });

  it("should render the table when show more is clicked", () => {
    render(<AsideSection data={aside.knowledge_graph} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("should hide the table when show less is clicked", () => {
    render(<AsideSection data={aside.knowledge_graph} />);
    const user = userEvent.setup();
    const button = screen.getByRole("button");
    user.click(button);
    user.click(button);
    expect(screen.queryByRole("table")).toBeNull();
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { beforeAll } from "vitest";
import AsideSection from "../AsideSection";
import { aside } from "../../../../mocks/responseMocks";
import store from "../../../../redux/app/store";
import { matches } from "../../../../utils/testing/windowsProperties";


function AsideSectionWrapper() {
  return (
    <Provider store={store}>
      <AsideSection data={aside.knowledge_graph} />
    </Provider>
  );
}

beforeEach(() => {
  Object.defineProperty(global, "scrollTo", {
    value: vitest.fn(),
    writable: true
  });
});

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", matches);
});

describe("AsideSection", () => {
  it("should render with the details closed", () => {
    render(<AsideSectionWrapper/>);
    expect(screen.queryByRole("table")).toBeNull();
  });

  it("should render the table when show more is clicked", () => {
    render(<AsideSectionWrapper/>);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("should hide the table when show less is clicked", () => {
    render(<AsideSectionWrapper/>);
    const user = userEvent.setup();
    const button = screen.getByRole("button");
    user.click(button);
    user.click(button);
    expect(screen.queryByRole("table")).toBeNull();
  });
});

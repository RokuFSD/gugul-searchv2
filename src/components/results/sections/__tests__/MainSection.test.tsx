import React from "react";
import { render, screen } from "@testing-library/react";
import MainSection from "../MainSection";
import { main } from "../../../../mocks/responseMocks";
import { Results } from "../../../../types/api";

function testElement() {
  return <div>Test</div>;
}

describe("MainSection component", () => {
  it("should render testElement in base of data", () => {
    render(
      <MainSection
        data={main.organic_results as Results[]}
        element={testElement()}
      />
    );
    const children = screen.queryAllByText("Test");
    expect(children).toHaveLength(main.organic_results.length);
  });
});

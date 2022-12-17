import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { video } from "../../mocks/responseMocks";
import VideoPlayer from "./VideoPlayer";

const { link, thumbnail, title } = video.video_results[0];


describe("VideoPlayer component", () => {
  it("should render", () => {
    render(<VideoPlayer src={link} title={title} thumbnail={thumbnail} />);
    expect(screen.getByTestId("player-button")).toBeInTheDocument();
  });

  it("should open the modal when the button is clicked", () => {
    render(<VideoPlayer src={link} title={title} thumbnail={thumbnail} />);
    const button = screen.getByTestId("player-button");
    fireEvent.click(button);
    expect(screen.getByTestId("close-button")).toBeInTheDocument()
  });
});

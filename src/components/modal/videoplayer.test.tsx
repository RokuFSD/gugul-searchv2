import React from "react";
import Modal from "react-modal";
import { render, screen, fireEvent } from "@testing-library/react";
import { video } from "../../mocks/responseMocks";
import VideoPlayer from "./VideoPlayer";

const { link, thumbnail, title } = video.video_results[0];

function testComponent() {
  document.body.innerHTML = `
    <div id="modal-root"></div>
  `;
  Modal.setAppElement("#modal-root");
  return <VideoPlayer src={link} title={title} thumbnail={thumbnail} />;
}

describe("VideoPlayer component", () => {
  it("should render", () => {
    render(testComponent());
    expect(screen.getByTestId("player-button")).toBeInTheDocument();
  });

  it("should open the modal when the button is clicked", () => {
    render(testComponent());
    const button = screen.getByTestId("player-button");
    fireEvent.click(button);
    expect(screen.getByTestId("close-button")).toBeInTheDocument();
  });
});

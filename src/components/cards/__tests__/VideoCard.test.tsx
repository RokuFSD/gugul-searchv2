import React from "react";
import { render, screen } from "@testing-library/react";
import VideoCard from "../VideoCard";
import { video } from "../../../mocks/responseMocks";
import { matches, matchesAlwaysTrue } from "../../../utils/tests/windowsProperties";

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", matches);
});

describe("VideoCard component", () => {
  it("should render without errors", () => {
    render(<VideoCard item={video.video_results[0]} />);
    expect(screen.getByText(video.video_results[0].snippet)).toBeInTheDocument();
  });

  it("should render without thumbnail", () => {
    const { thumbnail, ...rest } = video.video_results[0];
    render(<VideoCard item={rest} />);
    expect(screen.queryByTitle(thumbnail)).toBeNull();
  });

  it("should return null if there is no item on the props", () => {
    render(<VideoCard item={undefined} />);
    expect(screen.queryByText(video.video_results[0].snippet)).toBeNull();
  });

  it("should render VideoMobileCard if is mobile screen", () => {
    Object.defineProperty(window, "matchMedia", matchesAlwaysTrue);
    render(<VideoCard item={video.video_results[0]} />);
    expect(screen.queryByText(video.video_results[0].snippet)).toBeNull();
  });

  it("should not render thumbnail in VideoMobileCard", () => {
    Object.defineProperty(window, "matchMedia", matchesAlwaysTrue);
    const { thumbnail, ...rest } = video.video_results[0];
    render(<VideoCard item={rest} />);
    expect(screen.queryByAltText(video.video_results[0].title)).toBeNull();
  });

  it("should not render the VideoPlayer if is not youtube", () => {
    render(<VideoCard item={video.video_results[video.video_results.length - 1]} />);
    expect(screen.queryByTestId("player-button")).toBeNull();
  });

});


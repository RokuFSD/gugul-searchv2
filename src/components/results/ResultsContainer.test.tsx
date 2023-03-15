import { render, screen } from "@testing-library/react";
import React from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import ResultsContainer from "./ResultsContainer";
import useSearch from "../../hooks/useSearch";
import { SearchContextProvider } from "../../context/SearchContext";
import { main, news, video } from "../../mocks/responseMocks";
import { matches } from "../../utils/testing/windowsProperties";
import store from "../../redux/app/store";

const mockedUseSearch = useSearch as jest.Mock;

vitest.mock("../../hooks/useSearch");

const router = createMemoryRouter(
  [
    {
      path: "/",
      element: (
        <Provider store={store}>
          <SearchContextProvider>
            <ResultsContainer />
          </SearchContextProvider>
        </Provider>
      )
    },
    {
      path: "/search/:type",
      element: (
        <Provider store={store}>
          <div>
            Successfull search
            <ResultsContainer />
          </div>
        </Provider>
      )
    }
  ],
  {
    initialEntries: ["/"]
  }
);

describe("Results container", () => {
  beforeEach(() => {
    mockedUseSearch.mockImplementation(() => ({ isLoading: true }));
  });
  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("Renders without crashing", () => {
    render(<RouterProvider router={router} />);
  });

  it("Should render is loading", () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByLabelText("loader")).toBeInTheDocument();
  });

  it("Should render without crashing when there is no data", () => {
    mockedUseSearch.mockImplementation(() => ({
      isLoading: false,
      data: { data: [] }
    }));
    render(<RouterProvider router={router} />);
  });

  it("Should render the 'all' data", () => {
    Object.defineProperty(window, "matchMedia", matches);
    mockedUseSearch.mockImplementation(() => ({
      isLoading: false,
      data: { data: main }
    }));
    render(<RouterProvider router={router} />);
    expect(screen.queryByText("Loading...")).toBeFalsy();
    expect(screen.getByText(main.organic_results[0].title)).toBeInTheDocument();
  });

  it("Should render the 'news' data", () => {
    mockedUseSearch.mockImplementation(() => ({
      isLoading: false,
      data: { data: news }
    }));
    router.navigate("/search/news");
    render(<RouterProvider router={router} />);
    expect(screen.getByText(news.news_results[0].title)).toBeInTheDocument();
    expect(
      screen.queryByAltText(
        news.news_results[news.news_results.length - 1].title
      )
    ).toBeNull();
  });

  it("Should render the 'video' data", () => {
    Object.defineProperty(window, "matchMedia", matches);
    mockedUseSearch.mockImplementation(() => ({
      isLoading: false,
      data: { data: video }
    }));
    router.navigate("/search/videos");
    render(<RouterProvider router={router} />);
    expect(screen.getByText(video.video_results[0].title)).toBeInTheDocument();
  });
});

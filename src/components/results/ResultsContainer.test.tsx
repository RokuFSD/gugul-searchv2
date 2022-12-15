import { render, waitFor, renderHook, screen } from "@testing-library/react";
import React, { ReactNode } from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import ResultsContainer from "./ResultsContainer";
import useSearch from "../../hooks/useSearch";
import { SearchContextProvider } from "../../context/SearchContext";
import { main, news } from "../../mocks/responseMocks";

const mockedUseSearch = useSearch as jest.Mock<any>;

vitest.mock("../../hooks/useSearch");


const router = createMemoryRouter(
  [
    {
      path: "/",
      element: (
        <SearchContextProvider>
          <ResultsContainer />
        </SearchContextProvider>
      )
    },
    {
      path: "/search/:type",
      element: (
        <div>
          Successfull search
          <ResultsContainer />
        </div>
      )
    }
  ],
  {
    initialEntries: ["/"]
  }
);

// const wrapper = ({ children }: { children: ReactNode }) => (
//   <QueryClientProvider client={queryClient}>
//     {children}
//   </QueryClientProvider>
// );

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
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("Should render the 'all' data", () => {
    mockedUseSearch.mockImplementation(() => ({ isLoading: false, data: { data: main } }));
    render(<RouterProvider router={router} />);
    expect(screen.queryByText("Loading...")).toBeFalsy();
    expect(screen.getByText(main.organic_results[0].title)).toBeInTheDocument();
  });

  it("Should render the 'news' data", () => {
    mockedUseSearch.mockImplementation(() => ({ isLoading: false, data: { data: news } }));
    router.navigate("/search/news");
    render(<RouterProvider router={router} />);
    expect(screen.getByText(news.news_results[0].title)).toBeInTheDocument();
    expect(screen.queryByAltText(news.news_results[news.news_results.length - 1].title)).toBeNull();
  });

  it("Should render the 'video' data", () => {
    mockedUseSearch.mockImplementation(() => ({ isLoading: false, data: { data: news } }));
    router.navigate("/search/videos");
    render(<RouterProvider router={router} />);
  });
});


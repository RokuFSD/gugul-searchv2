import React, { ReactNode } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useGifs from "../useGifs";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useGifs hook", () => {
  it("should return the data", async () => {
    const { result } = renderHook(() => useGifs("mocked"), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBeFalsy());
    await waitFor(() => expect(result.current.hasNextPage).toBeTruthy());
  });

  it("should not have a next page when fetched the last one", async () => {
    const { result } = renderHook(() => useGifs("limited"), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBeFalsy());
    await waitFor(() => expect(result.current.hasNextPage).toBeFalsy());
  });
});

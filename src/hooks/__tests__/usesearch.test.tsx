import React, { ReactNode } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useSearch from "../useSearch";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe("useSearch hook", () => {
  it("should return the data and prefetch", async () => {
    const { result } = renderHook(() => useSearch({ type: "", query: "hello", page: 1 }), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(queryClient.getQueryData(["search", "", "hello", 2])).toBeTruthy();
  });
});

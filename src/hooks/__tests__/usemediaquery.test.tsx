import { renderHook } from "@testing-library/react";
import useMediaQuery from "../useMediaQuery";

const matches = {
  writable: true,
  value: vitest.fn().mockImplementation((query) => (
    {
      matches: parseInt(query, 10) <= 768,
      media: query,
      onchange: null,
      addEventListener: vitest.fn(),
      removeEventListener: vitest.fn(),
      dispatchEvent: vitest.fn(),
      scrollTo: vitest.fn()
    }
  ))
};

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", matches);
});

describe("useMediaQuery", () => {
  it("should return true when the screen is inferior to 768px", () => {
    const { result } = renderHook(() => useMediaQuery("768"));
    expect(result.current).toBe(true);
  });

  it("should return false when the screen is inferior to 768px", () => {
    const { result } = renderHook(() => useMediaQuery("1200"));
    expect(result.current).toBe(false);
  });
});


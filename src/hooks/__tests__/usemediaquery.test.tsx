import { renderHook } from "@testing-library/react";
import useMediaQuery from "../useMediaQuery";
import { matches } from "../../utils/tests/windowsProperties";

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


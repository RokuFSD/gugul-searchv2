export const matches = {
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


export const matchesAlwaysTrue = {
  writable: true,
  value: vitest.fn().mockImplementation((query) => (
    {
      matches: true,
      media: query,
      addEventListener: vitest.fn(),
      removeEventListener: vitest.fn(),
      dispatchEvent: vitest.fn()
    }
  ))
};

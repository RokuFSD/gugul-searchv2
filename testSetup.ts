import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { handlers } from "./src/utils/testing/restService";

expect.extend(matchers);

// eslint-disable-next-line import/prefer-default-export
export const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());

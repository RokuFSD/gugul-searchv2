import { rest } from "msw";
import { main } from "../../mocks/responseMocks";

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get("http://localhost:5005/", (req, res, ctx) =>
    res(ctx.status(200), ctx.json(main))
  ),
];

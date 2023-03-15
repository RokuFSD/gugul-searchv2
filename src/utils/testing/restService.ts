import { rest } from "msw";
import { main, gifs } from "../../mocks/responseMocks";

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get("http://localhost:5005/", (req, res, ctx) =>
    res(ctx.status(200), ctx.json(main))
  ),

  rest.get("https://api.giphy.com/v1/gifs/search", (req, res, ctx) => {
    const query = req.url.searchParams.get("q");
    const pagination = {
      normal: {
        total_count: 20,
        count: 15,
        offset: 0,
      },
      limited: {
        total_count: 5,
        count: 5,
        offset: 100,
      },
    };
    return res(
      ctx.status(200),
      ctx.json({
        ...gifs,
        pagination:
          query === "limited" ? pagination.limited : pagination.normal,
      })
    );
  }),
];

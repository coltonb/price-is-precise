import { NextRequest } from "next/server";
import { RouteMiddleware, NextRequestContext, NextRouteHandler } from "./types";
import defaultMiddleware from "./default-middleware";

export default function applyMiddleware(
  routeHandler: NextRouteHandler,
  middleware?: RouteMiddleware[]
) {
  const allMiddleware = defaultMiddleware.concat(middleware || []);

  return (request: NextRequest, context: NextRequestContext) => {
    let next = () => routeHandler(request, context);

    for (let i = allMiddleware.length - 1; i >= 0; i--) {
      const middleware = allMiddleware[i];
      const previous = next;
      next = () => middleware(previous, request, context);
    }

    return next();
  };
}

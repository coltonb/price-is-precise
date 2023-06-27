import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import applyMiddleware from "./apply-middleware";
import { HTTPError } from "@/lib/shared/http-error";
import {
  ApiRouteHandler,
  NextRequestContext,
  OptionalZodType,
  Request,
  RouteMiddleware,
} from "./types";

async function safelyParseRequestJson(request: NextRequest) {
  try {
    return await request.json();
  } catch (error) {
    return undefined;
  }
}

function parseRequest<T extends z.ZodType>(
  t: T,
  o: Object | undefined
): z.infer<T> {
  try {
    return t.parse(o);
  } catch (error) {
    if (!(error instanceof z.ZodError)) {
      throw error;
    }

    throw new HTTPError(error.issues, 422);
  }
}

function createRouteHandler<
  P extends OptionalZodType,
  B extends OptionalZodType
>(
  routeHandler: ApiRouteHandler<P, B>,
  options?: { pathSchema?: P; bodySchema?: B }
) {
  return async (request: NextRequest, context: NextRequestContext) => {
    const { pathSchema, bodySchema } = options || {};

    const requestModel = {
      path: context.params,
      body: bodySchema ? await safelyParseRequestJson(request) : undefined,
    };

    const requestSchema = z.object({
      path: pathSchema || z.undefined(),
      body: bodySchema || z.undefined(),
    });

    const parsedRequestModel = parseRequest(
      requestSchema,
      requestModel
    ) as Request<P, B>;

    const response = await routeHandler({
      request,
      ...parsedRequestModel,
    });

    if (response instanceof NextResponse) return response;

    return NextResponse.json(response);
  };
}

export default function createNextRouteHandler<
  P extends OptionalZodType = undefined,
  B extends OptionalZodType = undefined,
  R = unknown
>(
  routeHandler: ApiRouteHandler<P, B, R>,
  options?: {
    pathSchema?: P;
    bodySchema?: B;
    middleware?: RouteMiddleware[];
  }
): (
  request: NextRequest,
  context: NextRequestContext
) => Promise<NextResponse | (R extends NextResponse ? R : NextResponse<R>)> {
  return applyMiddleware(
    createRouteHandler(routeHandler, options),
    options?.middleware
  );
}

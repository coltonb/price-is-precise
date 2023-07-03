import type { NextRequest, NextResponse } from "next/server";
import type { z } from "zod";

export type OptionalZodType = z.ZodType | undefined;
export type InferOptionalZodType<T extends OptionalZodType> =
  T extends z.ZodType ? z.infer<T> : T;

export interface NextRequestContext {
  params: Record<string, string | string[]> | undefined;
}

export type NextRouteHandler = (
  request: NextRequest,
  context: NextRequestContext
) => Promise<NextResponse>;

export type RouteMiddleware = (
  next: () => Promise<NextResponse>,
  request: NextRequest,
  context: NextRequestContext
) => Promise<NextResponse>;

export interface Request<P extends OptionalZodType, B extends OptionalZodType> {
  path: InferOptionalZodType<P>;
  body: InferOptionalZodType<B>;
}

export type ApiRouteHandler<
  P extends OptionalZodType,
  B extends OptionalZodType,
  R = unknown
> = (
  kwargs: {
    request: NextRequest;
  } & Request<P, B>
) => Promise<R>;

export interface ErrorResponse {
  detail: unknown;
  status: number;
}

interface RouteHandlerMeta<
  P extends OptionalZodType,
  B extends OptionalZodType
> {
  _path: P;
  _body: B;
}

export type RouteHandler<
  P extends OptionalZodType = undefined,
  B extends OptionalZodType = undefined,
  R = unknown
> = ((
  request: NextRequest,
  context: NextRequestContext
) => Promise<NextResponse | (R extends NextResponse ? R : NextResponse<R>)>) &
  RouteHandlerMeta<P, B>;

export type NextRouteHandlerPathSchema<
  T extends RouteHandlerMeta<OptionalZodType, OptionalZodType>
> = InferOptionalZodType<T["_path"]>;

export type NextRouteHandlerBodySchema<
  T extends RouteHandlerMeta<OptionalZodType, OptionalZodType>
> = InferOptionalZodType<T["_body"]>;

export type NextRouteHandlerReturnType<T> = T extends (
  ...args: any[]
) => Promise<NextResponse<infer R> | NextResponse>
  ? R
  : unknown;

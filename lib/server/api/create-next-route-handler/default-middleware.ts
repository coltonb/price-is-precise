import { NextResponse } from "next/server";
import { RouteMiddleware } from "./types";
import { HTTPError } from "@/lib/shared/http-error";
import { Prisma } from "@prisma/client";

/**
 * Transforms HTTPErrors into JSON NextResponse objects.
 * Returns 500 response when an uncaught error is raised.
 */
const baseErrorHandler: RouteMiddleware = async (next) => {
  try {
    return await next();
  } catch (error) {
    console.log(error);

    if (error instanceof HTTPError) {
      return NextResponse.json(
        { detail: error.detail },
        { status: error.status }
      );
    }

    return NextResponse.json(
      { detail: "Internal Server Error" },
      { status: 500 }
    );
  }
};

/**
 * Re-raises errors from Prisma as HTTPErrors so they are handled with an appropriate response automatically.
 */
const prismaErrorHandler: RouteMiddleware = async (next) => {
  try {
    return await next();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new HTTPError("Not Found", 404);
      }
      if (error.code === "P2002") {
        throw new HTTPError("Conflict", 409);
      }
    }
    throw error;
  }
};

const middleware: RouteMiddleware[] = [baseErrorHandler, prismaErrorHandler];

export default middleware;

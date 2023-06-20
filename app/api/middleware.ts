import { NextResponse } from "next/server";
import { ZodError } from "zod";

export default function withMiddleware(route: any) {
  return async (...args: any[]) => {
    return await middleware(route, ...args);
  };
}

async function middleware(route: any, ...args: any[]) {
  try {
    return await route(...args);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Bad Request", errors: error.issues },
        { status: 400 }
      );
    }
    throw error;
  }
}

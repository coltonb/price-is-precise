import { NextResponse } from "next/server";
import { z } from "zod";
import withMiddleware from "@/app/api/middleware";
import { setActiveQuestionId } from "@/lib/store";

const postSchema = z.object({
  activeQuestionId: z.coerce.number().nullable(),
});

export const POST = withMiddleware(async (request: Request) => {
  const body = postSchema.parse(await request.json());

  await setActiveQuestionId(body.activeQuestionId);

  return new NextResponse(null, { status: 204 });
});

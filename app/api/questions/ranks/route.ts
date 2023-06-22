import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import withMiddleware from "@/app/api/middleware";

const postSchema = z.array(z.coerce.number());

export const POST = withMiddleware(async (request: Request) => {
  const body = postSchema.parse(await request.json());

  await prisma.$transaction(
    body.map((questionId, index) =>
      prisma.priceQuestion.updateMany({
        where: {
          id: questionId,
        },
        data: {
          rank: index,
        },
      })
    )
  );

  return new NextResponse(null, { status: 204 });
});

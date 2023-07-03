import createNextRouteHandler from "@/lib/server/api/create-next-route-handler";
import prisma from "@/lib/server/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export const POST = createNextRouteHandler(
  async ({ body }) => {
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
  },
  { bodySchema: z.array(z.coerce.number()) }
);

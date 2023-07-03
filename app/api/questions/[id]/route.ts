import prisma from "@/lib/server/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import createNextRouteHandler from "@/lib/server/api/create-next-route-handler";

const pathSchema = z.object({
  id: z.coerce.number(),
});

export const DELETE = createNextRouteHandler(
  async ({ path }) => {
    await prisma.priceQuestion.deleteMany({ where: { id: path.id } });

    return new NextResponse(null, { status: 204 });
  },
  { pathSchema }
);

export const PATCH = createNextRouteHandler(
  async ({ path, body }) => {
    const question = await prisma.priceQuestion.update({
      where: { id: path.id },
      data: body,
    });
    return question;
  },
  {
    pathSchema,
    bodySchema: z.object({
      name: z.string().trim(),
      price: z.coerce.number(),
      points: z.coerce.number().array(),
    }),
  }
);

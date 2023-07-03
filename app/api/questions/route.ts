import prisma from "@/lib/server/prisma";
import { z } from "zod";
import createNextRouteHandler from "@/lib/server/api/create-next-route-handler";

export const POST = createNextRouteHandler(
  async ({ body }) => {
    const question = await prisma.priceQuestion.create({
      data: body,
    });

    return question;
  },
  {
    bodySchema: z.object({
      name: z.string().trim(),
      price: z.coerce.number(),
      points: z.coerce.number().array(),
    }),
  }
);

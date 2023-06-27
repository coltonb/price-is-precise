import prisma from "@/lib/server/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import createNextRouteHandler from "@/lib/server/api/create-next-route-handler";

const postSchema = z.object({
  name: z.string().min(1),
});

export const POST = createNextRouteHandler(
  async ({ body }) => {
    const team = await prisma.team.create({ data: body });

    return NextResponse.json(team);
  },
  { bodySchema: postSchema }
);

export type CreateTeamBody = z.infer<typeof postSchema>;

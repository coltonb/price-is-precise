import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import withMiddleware from "@/app/api/middleware";

const paramsSchema = z.object({
  id: z.coerce.number(),
});

type Params = z.infer<typeof paramsSchema>;

export const DELETE = withMiddleware(
  async (_request: Request, { params }: { params: Params }) => {
    params = paramsSchema.parse(params);

    await prisma.team.deleteMany({ where: { id: params.id } });

    return new NextResponse(null, { status: 204 });
  }
);

const patchSchema = z.object({
  score: z.coerce.number(),
});

export const PATCH = withMiddleware(
  async (request: Request, { params }: { params: Params }) => {
    params = paramsSchema.parse(params);
    const body = patchSchema.parse(await request.json());

    const team = await prisma.team.updateMany({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(team);
  }
);

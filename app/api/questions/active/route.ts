import { NextResponse } from "next/server";
import { z } from "zod";
import { setActiveQuestionId } from "@/lib/server/store";
import createNextRouteHandler from "@/lib/server/api/create-next-route-handler";

export const POST = createNextRouteHandler(
  async ({ body }) => {
    await setActiveQuestionId(body.id);
    return new NextResponse(null, { status: 204 });
  },
  { bodySchema: z.object({ id: z.coerce.number().nullable() }) }
);

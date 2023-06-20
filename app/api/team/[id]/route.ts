import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.team.delete({ where: { id: Number(params.id) } });

  return new NextResponse(null, { status: 204 });
}

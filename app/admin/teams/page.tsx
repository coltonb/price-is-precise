import prisma from "@/lib/prisma";
import Teams from "@/components/teams";

export const dynamic = "force-dynamic";

export default async function TeamsPage() {
  const teams = await prisma.team.findMany({
    include: { users: true },
    orderBy: { name: "asc" },
  });
  return <Teams teams={teams} />;
}
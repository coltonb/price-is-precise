import prisma from "@/lib/prisma";
import Teams from "@/components/teams";

export default async function TeamsPage() {
  const teams = await prisma.team.findMany({ include: { users: true } });
  return <Teams teams={teams} />;
}

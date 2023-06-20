import prisma from "@/lib/prisma";
import Team from "@/components/team";

export default async function Teams() {
  const teams = await prisma.teams.findMany();
  return (
    <div className="flex w-full space-x-3">
      {teams.map((team) => {
        return <Team key={team.id} id={team.id} />;
      })}
    </div>
  );
}

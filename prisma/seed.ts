import prisma from "../lib/prisma";

async function main() {
  const teamNames = ["Iowa", "Dragon"];

  const teams = await Promise.all(
    teamNames.map((team) =>
      prisma.team.upsert({
        where: { name: team },
        update: {},
        create: { name: team, score: 999 },
      })
    )
  );

  const users = [
    { teamId: teams[0].id, name: "Colton" },
    { teamId: teams[0].id, name: "Noah" },
    { teamId: teams[0].id, name: "Nolder" },
    { teamId: teams[1].id, name: "Kevin" },
    { teamId: teams[1].id, name: "Jacob" },
    { teamId: teams[1].id, name: "Kelly" },
    { teamId: teams[1].id, name: "Ryan" },
  ];

  await Promise.all(
    users.map((user) =>
      prisma.user.upsert({
        where: { name_teamId: { name: user.name, teamId: user.teamId } },
        update: {},
        create: {
          name: user.name,
          teamId: user.teamId,
        },
      })
    )
  );
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

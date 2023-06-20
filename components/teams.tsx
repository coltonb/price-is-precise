"use client";

import Team from "@/components/team";
import { teams, users } from "@prisma/client";

interface TeamsProps {
  teams: (teams & { users: users[] })[];
}

export default function Teams(props: TeamsProps) {
  return (
    <div className="flex w-full space-x-3">
      {props.teams.map((team) => {
        return (
          <Team
            key={team.id}
            team={team}
            onDelete={(team) => console.log(team)}
          />
        );
      })}
    </div>
  );
}

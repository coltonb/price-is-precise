"use client";

import TeamComponent from "@/components/admin/teams/team";
import { Team, User } from "@prisma/client";
import { useState } from "react";
import ClientApi from "@/lib/clientApi";

interface TeamsProps {
  teams: (Team & { users: User[] })[];
}

export default function Teams(props: TeamsProps) {
  const [teams, setTeams] = useState(props.teams);

  const handleDelete = (teamToDelete: Team) => {
    setTeams(teams.filter((team) => team.id !== teamToDelete.id));
    ClientApi.deleteTeam(teamToDelete.id);
  };

  return (
    <div className="flex flex-wrap w-full gap-3">
      {teams.map((team) => {
        return (
          <TeamComponent key={team.id} team={team} onDelete={handleDelete} />
        );
      })}
    </div>
  );
}

"use client";

import TeamComponent from "@/components/team";
import { Team, User } from "@prisma/client";
import { useState } from "react";
import Api from "@/lib/api";

interface TeamsProps {
  teams: (Team & { users: User[] })[];
}

export default function Teams(props: TeamsProps) {
  const [teams, setTeams] = useState(props.teams);

  const handleDelete = async (teamToDelete: Team) => {
    await Api.deleteTeam(teamToDelete.id);
    setTeams(teams.filter((team) => team.id !== teamToDelete.id));
  };

  return (
    <div className="flex w-full space-x-3">
      {teams.map((team) => {
        return (
          <TeamComponent key={team.id} team={team} onDelete={handleDelete} />
        );
      })}
    </div>
  );
}

"use client";

import TeamComponent from "@/components/admin/teams/team";
import { Team, User } from "@prisma/client";
import { useState } from "react";
import * as ClientApi from "@/lib/client/client-api";
import { deepCopy } from "@/lib/utils";
import CreateTeam from "./createTeam";

interface TeamsProps {
  teams: (Team & { users: User[] })[];
}

export default function Teams(props: TeamsProps) {
  const [teams, setTeams] = useState(deepCopy(props.teams));

  const handleDelete = (teamToDelete: Team) => {
    setTeams(teams.filter((team) => team.id !== teamToDelete.id));
    ClientApi.deleteTeam({ path: { id: teamToDelete.id } });
  };

  const handleCreate = (team: Team) => {
    setTeams(teams.concat([{ users: [], ...team }]));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      {teams.map((team) => {
        return (
          <TeamComponent key={team.id} team={team} onDelete={handleDelete} />
        );
      })}
      <CreateTeam onCreate={handleCreate} />
    </div>
  );
}

"use client";

import { Team, User } from "@prisma/client";
import { useState } from "react";
import { useDebounce } from "react-use";
import DeleteButton from "@/components/deleteButton";
import CopyToClipboardButton from "@/components/copyToClipboardButton";

interface TeamProps {
  team: Team & { users: User[] };
  onDelete: (team: Team) => any;
}

export default function Team(props: TeamProps) {
  const [score, setScore] = useState(props.team.score);
  const [debouncedScore, setDebouncedScore] = useState(props.team.score);

  useDebounce(
    () => {
      if (score == debouncedScore) {
        return;
      }

      setDebouncedScore(score);
    },
    1500,
    [score]
  );

  const handleScoreKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  const handleScoreChange = (e: any) => setScore(parseInt(e.target.value) || 0);

  return (
    <div className="card card-compact w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <span className="flex-1">
            <span>{props.team.name}</span>
            <CopyToClipboardButton
              className="pl-1"
              value={props.team.code.toUpperCase()}
              tooltipText="Copy Team Code"
            />
          </span>

          <span>
            Score:
            <input
              type="text"
              maxLength={4}
              className="pl-1 bg-transparent focus:underline flex-1 focus:outline-none"
              style={{ width: "4ch" }}
              value={score}
              onChange={handleScoreChange}
              onKeyDown={handleScoreKeyDown}
            />
          </span>

          <DeleteButton
            tooltipText="Delete Team"
            onDelete={() => props.onDelete(props.team)}
          />
        </h2>
        <hr />
        <table className="table table-xs table-zebra">
          <tbody>
            {props.team.users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

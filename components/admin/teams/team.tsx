"use client";

import { Team, User } from "@prisma/client";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useDebounce } from "react-use";
import DeleteButton from "@/components/deleteButton";
import CopyToClipboardButton from "@/components/copyToClipboardButton";
import * as ClientApi from "@/lib/client/client-api";
import { z } from "zod";

interface TeamProps {
  team: Team & { users: User[] };
  onDelete: (team: Team) => unknown;
}

export default function Team(props: TeamProps) {
  const [score, setScore] = useState(props.team.score);
  const [debouncedScore, setDebouncedScore] = useState(props.team.score);

  useDebounce(
    () => {
      if (score == debouncedScore) {
        return;
      }

      ClientApi.updateTeam({
        path: { id: props.team.id },
        body: { score: score },
      });
      setDebouncedScore(score);
    },
    1500,
    [score]
  );

  const handleScoreKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleScoreChange = (e: ChangeEvent<HTMLInputElement>) =>
    setScore(z.coerce.number().catch(score).parse(e.target.value));

  return (
    <div className="card card-compact bg-neutral-focus shadow-xl min-h-[10rem]">
      <div className="card-body">
        <h2 className="card-title">
          <span className="flex-1">
            <span>{props.team.name}</span>
            <CopyToClipboardButton
              className="mx-1"
              value={
                props.team.name + " team code: " + props.team.code.toUpperCase()
              }
              tooltipText="Copy Team Code"
            />
          </span>

          <div>
            <span className="mr-[0.25em]">Score:</span>
            <input
              type="text"
              maxLength={3}
              className="bg-transparent focus:underline flex-1 focus:outline-none"
              style={{ width: "3ch" }}
              value={score}
              onChange={handleScoreChange}
              onKeyDown={handleScoreKeyDown}
            />
          </div>
          <button
            className="btn btn-xs btn-outline btn-success"
            onClick={() => setScore(Math.min(score + 1, 999))}
          >
            +1
          </button>
          <button
            className="btn btn-xs btn-outline btn-error"
            onClick={() => setScore(Math.max(score - 1, 0))}
          >
            -1
          </button>

          <DeleteButton
            tooltipText="Delete Team"
            className="mx-1"
            onDelete={() => props.onDelete(props.team)}
          />
        </h2>
        <hr />
        <div className="max-h-32 overflow-x-auto">
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
    </div>
  );
}

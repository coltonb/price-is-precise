"use client";

import { teams, users } from "@prisma/client";
import {
  ClipboardDocumentIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDebounce } from "react-use";

interface TeamProps {
  team: teams & { users: users[] };
}

export default function Team(props: TeamProps) {
  const [score, setScore] = useState(props.team.score);
  const [debouncedScore, setDebouncedScore] = useState(score);

  const [, cancel] = useDebounce(
    () => {
      if (score === debouncedScore) {
        return;
      }

      console.log(score);
      setDebouncedScore(score);
    },
    2000,
    [score]
  );

  return (
    <div className="card card-compact w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <span className="flex-1">
            <span>{props.team.name}</span>
            <div className="tooltip" data-tip="Copy Team Code">
              <button className="pl-1">
                <ClipboardDocumentIcon className="inline w-5" />
              </button>
            </div>
          </span>

          <span>
            Score:
            <input
              type="text"
              maxLength={3}
              className="pl-1 w-10 bg-transparent focus:underline flex-1 focus:outline-none"
              value={score}
              onChange={(e) => {
                setScore(parseInt(e.target.value) || 0);
              }}
            />
          </span>
          <div className="tooltip" data-tip="Delete Team">
            <button>
              <XCircleIcon className="inline w-5" />
            </button>
          </div>
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

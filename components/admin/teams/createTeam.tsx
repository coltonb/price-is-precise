import * as ClientApi from "@/lib/client/client-api";
import { Team } from "@prisma/client";
import { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";

interface CreateTeamProps {
  onCreate?: (team: Team) => unknown;
}

export default function CreateTeam(props: CreateTeamProps) {
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setShowError(false);
    setName(value);
  };

  const handleCreate = async () => {
    setCreating(true);
    try {
      const team = await ClientApi.createTeam({ body: { name } });
      if (props.onCreate) props.onCreate(team);
      setName("");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        setShowError(true);
        return;
      }
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="card card-compact bg-base-200 shadow-xl min-h-[10rem]">
      <div className="card-body items-center justify-center">
        <div className="card-actions">
          <div className="relative form-control">
            <label className="bottom-12 absolute label" htmlFor="team-name">
              Team Name
            </label>
            <input
              className={
                "input transition  " + (showError ? "input-error" : "")
              }
              value={name}
              onChange={handleChange}
              id="team-name"
            />
            <label
              className={
                "top-12 transition-opacity text-error absolute label " +
                (showError ? "opacity-1" : "opacity-0 invisible")
              }
              htmlFor="team-name"
            >
              Name is already taken.
            </label>
          </div>
          <button
            className="btn btn-primary"
            disabled={name.length === 0 || creating}
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

import ClientApi from "@/lib/client/api";
import { HTTPError } from "@/lib/shared/http-error";
import { Team } from "@prisma/client";
import { ChangeEvent, useState } from "react";

interface CreateTeamProps {
  onCreate?: (team: Team) => any;
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
      const team = await ClientApi.createTeam({ name });
      if (props.onCreate) props.onCreate(team);
      setName("");
    } catch (error) {
      if (error instanceof HTTPError && error.status === 409) {
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
          <input
            className={"input transition  " + (showError ? "input-error" : "")}
            placeholder="Team Name"
            value={name}
            onChange={handleChange}
          />
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

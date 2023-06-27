import ClientApi from "@/lib/client/api";
import { ChangeEvent, useState } from "react";
import { z } from "zod";

export default function CreateTeam() {
  const [name, setName] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setName(value);
  };

  const handleCreate = async () => {
    ClientApi.createTeam({ name });
  };

  return (
    <div className="card card-compact bg-base-200 shadow-xl min-h-[10rem]">
      <div className="card-body items-center justify-center">
        <div className="card-actions">
          <input
            className="input"
            placeholder="Team Name"
            value={name}
            onChange={handleChange}
          />
          <button className="btn btn-primary" disabled={name.length === 0}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

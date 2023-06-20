import prisma from "@/lib/prisma";
import { selectColor } from "@/lib/utils";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

interface TeamProps {
  id: number;
}

export default async function Team(props: TeamProps) {
  const team = await prisma.teams.findFirst({
    where: { id: props.id },
    include: { users: true },
  });

  if (!team) {
    return <div />;
  }

  return (
    <div className="card card-compact w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <span className="flex-1">
            <span>{team.name}</span>
            <div className="tooltip" data-tip="Copy Team Code">
              <button className="pl-1">
                <ClipboardDocumentIcon className="inline w-5" />
              </button>
            </div>
          </span>

          <span>Score: {team.score}</span>
        </h2>
        <hr />
        <table className="table table-xs table-zebra">
          <tbody>
            {team.users.map((user) => (
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

import DeleteButton from "@/components/deleteButton";
import IconButton from "@/components/iconButton";
import prisma from "@/lib/prisma";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

export const dynamic = "force-dynamic";

export default async function QuestionsPage() {
  const questions = await prisma.priceQuestion.findMany({
    orderBy: { rank: "asc" },
  });

  return (
    <div className="card bg-neutral-focus">
      <div className="card-body">
        <h1 className="card-title">Price Questions</h1>
        <table className="table table-fixed table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question.id}>
                <td>{question.name}</td>
                <td>{"$" + question.price.toFixed(2)}</td>
                <td>{question.points.join(", ")}</td>
                <td className="flex gap-x-2">
                  <IconButton tooltipText="Move Question Up">
                    <ArrowUpIcon className="icon" />
                  </IconButton>
                  <IconButton tooltipText="Move Question Down">
                    <ArrowDownIcon className="icon" />
                  </IconButton>
                  <IconButton tooltipText="Edit Question">
                    <PencilIcon className="icon" />
                  </IconButton>
                  <DeleteButton tooltipText="Delete Question" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

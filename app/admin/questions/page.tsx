import Questions from "@/components/admin/questions";
import prisma from "@/lib/server/prisma";
import { getActiveQuestionId } from "@/lib/server/game-state";

export const dynamic = "force-dynamic";

export default async function QuestionsPage() {
  const questions = await prisma.priceQuestion.findMany({
    orderBy: { rank: "asc" },
  });
  const activeQuestionId = await getActiveQuestionId();

  return (
    <Questions questions={questions} activeQuestionId={activeQuestionId} />
  );
}

import Questions from "@/components/admin/questions";
import prisma from "@/lib/prisma";
import { getActiveQuestionId } from "@/lib/store";

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

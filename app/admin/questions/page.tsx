import Questions from "@/components/questions";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function QuestionsPage() {
  const questions = await prisma.priceQuestion.findMany({
    orderBy: { rank: "asc" },
  });

  return <Questions questions={questions} />;
}

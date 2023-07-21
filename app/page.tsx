import Game from "@/components/game";
import { getActiveQuestionId } from "@/lib/server/game-state";

export const preferredRegion = "home";
export const dynamic = "force-dynamic";

export default async function Home() {
  const activeQuestionId = await getActiveQuestionId();
  return <Game activeQuestionId={activeQuestionId} />;
}

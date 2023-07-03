import { kv } from "@vercel/kv";
import pusher from "@/lib/server/pusher";
import { CHANNEL, Events } from "@/lib/shared/notifications";
import { ActiveQuestionId } from "@/lib/shared/game-state";

enum GameState {
  ACTIVE_QUESTION_ID = "active_question_id",
}

export async function getActiveQuestionId(): Promise<ActiveQuestionId> {
  return (await kv.get(GameState.ACTIVE_QUESTION_ID)) ?? null;
}

export async function setActiveQuestionId(activeQuestionId: ActiveQuestionId) {
  await Promise.all([
    kv.set(GameState.ACTIVE_QUESTION_ID, activeQuestionId),
    pusher.trigger(CHANNEL, Events.ACTIVE_QUESTION_ID, activeQuestionId),
  ]);
}

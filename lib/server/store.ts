import { kv } from "@vercel/kv";

export type ActiveQuestionId = number | null;

enum GameState {
  ACTIVE_QUESTION_ID = "active_question_id",
}

export async function getActiveQuestionId(): Promise<ActiveQuestionId> {
  return (await kv.get(GameState.ACTIVE_QUESTION_ID)) ?? null;
}

export async function setActiveQuestionId(activeQuestionId: ActiveQuestionId) {
  await kv.set(GameState.ACTIVE_QUESTION_ID, activeQuestionId);
}

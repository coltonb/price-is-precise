import { kv } from "@vercel/kv";

export type ActiveQuestionId = number | null;

export async function getActiveQuestionId(): Promise<ActiveQuestionId> {
  return (await kv.get("active_question_id")) ?? null;
}

export async function setActiveQuestionId(activeQuestionId: ActiveQuestionId) {
  await kv.set("active_question_id", activeQuestionId);
}

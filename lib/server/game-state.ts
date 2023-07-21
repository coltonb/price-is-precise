import { kv } from "@vercel/kv";
import pusher from "@/lib/server/pusher";
import { CHANNEL, Events } from "@/lib/shared/notifications";
import GameState from "@/lib/shared/game-state";

const GAME_STATE_KEY = "game_state";

const initialGameState: GameState = {
  activeQuestionId: null,
};

export async function getGameState(): Promise<GameState> {
  return (
    ((await kv.hgetall(GAME_STATE_KEY)) as unknown as GameState | undefined) ??
    initialGameState
  );
}

export async function getActiveQuestionId() {
  return (await getGameState()).activeQuestionId;
}

export async function setActiveQuestionId(
  activeQuestionId: GameState["activeQuestionId"]
) {
  await kv.hset(GAME_STATE_KEY, { activeQuestionId });
  await pusher.trigger(CHANNEL, Events.UPDATE, await getGameState());
}

import { ActiveQuestionId } from "./store";

export default class ClientApi {
  static async deleteTeam(teamId: number) {
    await fetch(`/api/teams/${teamId}`, { method: "DELETE" });
  }

  static async updateTeam(teamId: number, updates: { score: number }) {
    await fetch(`/api/teams/${teamId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  }

  static async setActiveQuestionId(activeQuestionId: ActiveQuestionId) {
    await fetch(`/api/questions/active`, {
      method: "POST",
      body: JSON.stringify({ activeQuestionId: activeQuestionId }),
    });
  }

  static async setQuestionRanks(questionIds: number[]) {
    await fetch(`/api/questions/ranks`, {
      method: "POST",
      body: JSON.stringify(questionIds),
    });
  }
}

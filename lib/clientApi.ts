export default class Api {
  static async deleteTeam(teamId: number) {
    await fetch(`/api/team/${teamId}`, { method: "DELETE" });
  }

  static async updateTeam(teamId: number, updates: { score: number }) {
    await fetch(`/api/team/${teamId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  }
}

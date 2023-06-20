export default class Api {
  static async deleteTeam(teamId: number) {
    await fetch(`/api/team/${teamId}`, { method: "DELETE" });
  }
}

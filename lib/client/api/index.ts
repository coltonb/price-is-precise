import { UpdateQuestionBody } from "@/app/api/questions/[id]/route";
import { SetQuestionRanksBody } from "@/app/api/questions/ranks/route";
import { CreateQuestionBody } from "@/app/api/questions/route";
import { UpdateTeamBody } from "@/app/api/teams/[id]/route";
import { PriceQuestion, Team } from "@prisma/client";
import { DELETE, PATCH, POST, generateEndpoints } from "./utils";
import { SetActiveQuestionIdBody } from "@/app/api/questions/active/route";
import { CreateTeamBody } from "@/app/api/teams/route";

enum Resources {
  TEAMS = "teams",
  QUESTIONS = "questions",
}

const Endpoints = generateEndpoints(Resources);

export default class ClientApi {
  static async deleteTeam(teamId: number) {
    await DELETE(Endpoints.TEAMS(teamId));
  }

  static async updateTeam(
    teamId: number,
    updates: UpdateTeamBody
  ): Promise<Team> {
    return (await PATCH(Endpoints.TEAMS(teamId), updates)).json();
  }

  static async createTeam(team: CreateTeamBody): Promise<Team> {
    return (await POST(Endpoints.TEAMS(), team)).json();
  }

  static async setActiveQuestionId(
    activeQuestionId: SetActiveQuestionIdBody["id"]
  ) {
    await POST(Endpoints.QUESTIONS("active"), { id: activeQuestionId });
  }

  static async setQuestionRanks(questionIds: SetQuestionRanksBody) {
    await POST(Endpoints.QUESTIONS("ranks"), questionIds);
  }

  static async deleteQuestion(questionId: number) {
    await DELETE(Endpoints.QUESTIONS(questionId));
  }

  static async updateQuestion(
    questionId: number,
    updates: UpdateQuestionBody
  ): Promise<PriceQuestion> {
    return (await PATCH(Endpoints.QUESTIONS(questionId), updates)).json();
  }

  static async createQuestion(
    question: CreateQuestionBody
  ): Promise<PriceQuestion> {
    return (await POST(Endpoints.QUESTIONS(), question)).json();
  }
}

import type * as QuestionsIdRoutes from "@/app/api/questions/[id]/route";
import type * as QuestionsActiveRoutes from "@/app/api/questions/active/route";
import type * as QuestionsRankRoutes from "@/app/api/questions/ranks/route";
import type * as QuestionsRoutes from "@/app/api/questions/route";
import type * as TeamsIdRoutes from "@/app/api/teams/[id]/route";
import type * as TeamsRoutes from "@/app/api/teams/route";
import {
  NextRouteHandlerBodySchema,
  NextRouteHandlerReturnType,
} from "@/lib/server/api/create-next-route-handler/types";
import axios from "axios";
import urlcat from "urlcat";

const client = axios.create({ baseURL: "/api" });

client.interceptors.request.use((config) => {
  console.debug(`[${config.method}]`, config.url);
  return config;
});

export default class ClientApi {
  static async deleteTeam(teamId: number) {
    await client.delete(urlcat("/teams/:teamId", { teamId }));
  }

  static async updateTeam(
    teamId: number,
    updates: NextRouteHandlerBodySchema<typeof TeamsIdRoutes.PATCH>
  ): Promise<NextRouteHandlerReturnType<typeof TeamsIdRoutes.PATCH>> {
    return (await client.patch(urlcat("/teams/:teamId", { teamId }), updates))
      .data;
  }

  static async createTeam(
    team: NextRouteHandlerBodySchema<typeof TeamsRoutes.POST>
  ): Promise<NextRouteHandlerReturnType<typeof TeamsRoutes.POST>> {
    return (await client.post("/teams", team)).data;
  }

  static async setActiveQuestionId(
    activeQuestionId: NextRouteHandlerBodySchema<
      typeof QuestionsActiveRoutes.POST
    >["id"]
  ) {
    await client.post("/questions/active", { id: activeQuestionId });
  }

  static async setQuestionRanks(
    questionIds: NextRouteHandlerBodySchema<typeof QuestionsRankRoutes.POST>
  ) {
    await client.post("/questions/ranks", questionIds);
  }

  static async deleteQuestion(questionId: number) {
    await client.delete(urlcat("/questions/:questionId", { questionId }));
  }

  static async updateQuestion(
    questionId: number,
    updates: NextRouteHandlerBodySchema<typeof QuestionsIdRoutes.PATCH>
  ): Promise<NextRouteHandlerReturnType<typeof QuestionsIdRoutes.PATCH>> {
    return (
      await client.patch(
        urlcat("/questions/:questionId", { questionId }),
        updates
      )
    ).data;
  }

  static async createQuestion(
    question: NextRouteHandlerBodySchema<typeof QuestionsRoutes.POST>
  ): Promise<NextRouteHandlerReturnType<typeof QuestionsRoutes.POST>> {
    return (await client.post("/questions", question)).data;
  }

  static async getQuestion(
    questionId: number
  ): Promise<NextRouteHandlerReturnType<typeof QuestionsIdRoutes.GET>> {
    return (await client.get(urlcat("/questions/:questionId", { questionId })))
      .data;
  }
}

import type * as QuestionsIdRoutes from "@/app/api/questions/[id]/route";
import type * as QuestionsActiveRoutes from "@/app/api/questions/active/route";
import type * as QuestionsRankRoutes from "@/app/api/questions/ranks/route";
import type * as QuestionsRoutes from "@/app/api/questions/route";
import type * as TeamsIdRoutes from "@/app/api/teams/[id]/route";
import type * as TeamsRoutes from "@/app/api/teams/route";
import {
  NextRouteHandlerBodySchema,
  NextRouteHandlerPathSchema,
  NextRouteHandlerReturnType,
  RouteHandler,
} from "@/lib/server/api/create-next-route-handler/types";
import axios, { AxiosPromise } from "axios";
import urlcat from "urlcat";

const client = axios.create({ baseURL: "/api" });

client.interceptors.request.use((config) => {
  console.debug(`[${config.method}]`, config.url);
  return config;
});

function createApiCall<T>(
  method: (...args: any[]) => AxiosPromise,
  url: string
) {
  type Path = T extends RouteHandler<infer P, infer B, infer R>
    ? NextRouteHandlerPathSchema<T>
    : unknown;
  type Body = T extends RouteHandler<infer P, infer B, infer R>
    ? NextRouteHandlerBodySchema<T>
    : unknown;
  type Return = T extends RouteHandler<infer P, infer B, infer R>
    ? NextRouteHandlerReturnType<T>
    : unknown;

  type PathOptions = Path extends undefined ? { path?: Path } : { path: Path };
  type BodyOptions = Body extends undefined ? { body?: Body } : { body: Body };

  return async (options: PathOptions & BodyOptions): Promise<Return> => {
    if (options.path) {
      url = urlcat(url, options.path);
    }

    if (options.body) {
      return (await method(url, options.body)).data;
    } else {
      return (await method(url)).data;
    }
  };
}

export const deleteTeam = createApiCall<typeof TeamsIdRoutes.DELETE>(
  client.delete,
  "/teams/:id"
);

export const updateTeam = createApiCall<typeof TeamsIdRoutes.PATCH>(
  client.patch,
  "/teams/:id"
);

export const createTeam = createApiCall<typeof TeamsRoutes.POST>(
  client.post,
  "/teams"
);

export const setActiveQuestionId = createApiCall<
  typeof QuestionsActiveRoutes.POST
>(client.post, "/questions/active");

export const setQuestionRanks = createApiCall<typeof QuestionsRankRoutes.POST>(
  client.post,
  "/questions/ranks"
);

export const deleteQuestion = createApiCall<typeof QuestionsIdRoutes.DELETE>(
  client.delete,
  "/questions/:id"
);

export const updateQuestion = createApiCall<typeof QuestionsIdRoutes.PATCH>(
  client.patch,
  "/questions/:id"
);

export const createQuestion = createApiCall<typeof QuestionsRoutes.POST>(
  client.post,
  "/questions"
);

export const getQuestion = createApiCall<typeof QuestionsIdRoutes.GET>(
  client.get,
  "/quesitons/:id"
);

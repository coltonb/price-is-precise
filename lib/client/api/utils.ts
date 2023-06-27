const REQUEST = async (method: string, url: string, options?: Object) => {
  console.debug(`[${method}]`, url);
  return fetch(url, Object.assign({ method }, options ?? {}));
};
const REQUEST_WITH_BODY = async (method: string, url: string, body: any) =>
  REQUEST(method, url, { body: JSON.stringify(body) });

const BUILD_URL = (...path: any[]) => path.join("/");

export function generateEndpoints<T extends Object>(resources: T) {
  type Endpoints = {
    [resource in keyof T]: (...path: any[]) => string;
  };

  return Object.entries(resources).reduce<Endpoints>((acc, [name, url]) => {
    (acc as { [resource: string]: Function })[name] = (...path: any[]) =>
      BUILD_URL("/api", url, ...path);

    return acc;
  }, {} as Endpoints);
}

export const GET = async (url: string) => REQUEST("GET", url);
export const DELETE = async (url: string) => REQUEST("DELETE", url);
export const POST = async (url: string, body: any) =>
  REQUEST_WITH_BODY("POST", url, body);
export const PATCH = async (url: string, body: any) =>
  REQUEST_WITH_BODY("PATCH", url, body);

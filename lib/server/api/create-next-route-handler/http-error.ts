import { ErrorResponse } from "./types";

export class HTTPError extends Error {
  detail: ErrorResponse["detail"];
  status: ErrorResponse["status"];

  constructor(
    detail: ErrorResponse["detail"],
    status: ErrorResponse["status"]
  ) {
    super(`[${status}] ${JSON.stringify(detail)}`);

    this.detail = detail;
    this.status = status;
  }
}

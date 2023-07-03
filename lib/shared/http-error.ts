export class HTTPError extends Error {
  detail: unknown;
  status: number;

  constructor(detail: unknown, status: number) {
    super(`[${status}] ${JSON.stringify(detail)}`);

    this.detail = detail;
    this.status = status;
  }
}

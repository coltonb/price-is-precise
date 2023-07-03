export class HTTPError extends Error {
  detail: object;
  status: number;

  constructor(detail: object, status: number) {
    super(`[${status}] ${JSON.stringify(detail)}`);

    this.detail = detail;
    this.status = status;
  }
}

export class HTTPError extends Error {
  detail: Object;
  status: number;

  constructor(detail: Object, status: number) {
    super(`[${status}] ${JSON.stringify(detail)}`);

    this.detail = detail;
    this.status = status;
  }
}

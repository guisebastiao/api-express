import { ResponseBodyInterface } from "@/DTO/ResponseBody";

export class ServerErrorHandler extends Error {
  private responseBody: ResponseBodyInterface;

  constructor(responseBody: ResponseBodyInterface) {
    super(responseBody.message);
    this.responseBody = responseBody;
  }

  public getResponse(): ResponseBodyInterface {
    return this.responseBody;
  }
}

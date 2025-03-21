export interface MetaInterface {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface FieldErrosInterface {
  field: string;
  error: string[];
}

export interface ResponseBodyInterface {
  statusCode: number;
  message: string;
  timestamp?: string;
  data?: Object | Array<Object>;
  meta?: MetaInterface;
  fieldErros?: FieldErrosInterface[];
}

export class ResponseBody {
  private responseBody;

  constructor(responseBody: ResponseBodyInterface) {
    this.responseBody = responseBody;
    this.responseBody.timestamp = new Date().toISOString();
  }

  public getResponse(): ResponseBodyInterface {
    return this.responseBody;
  }
}

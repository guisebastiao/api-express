import { ServerErrorHandler } from "@/exception/ServerErrorHandler";
import { ResponseBodyInterface } from "@/DTO/ResponseBody";
import { NextFunction, Request, Response } from "express";

export const notFoundMiddleware = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const responseBody: ResponseBodyInterface = {
    statusCode: 404,
    message: "Rota não encontrada",
  };

  return next(new ServerErrorHandler(responseBody));
};

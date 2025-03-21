import { NextFunction, Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ServerErrorHandler } from "@/exception/ServerErrorHandler";
import { FieldErrosInterface, ResponseBodyInterface } from "@/DTO/ResponseBody";

export const validateDTO = (dtoClass: any) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const fieldErrors: FieldErrosInterface[] = [];

      errors.forEach((err) => {
        if (err.constraints) {
          Object.values(err.constraints).forEach((errorMessage) => {
            fieldErrors.push({
              field: err.property,
              error: [errorMessage],
            });
          });
        }
      });

      const responseBody: ResponseBodyInterface = {
        statusCode: 422,
        message: "Erro de validação",
        fieldErros: fieldErrors,
      };

      throw new ServerErrorHandler(responseBody);
    }

    next();
  };
};

import { NextFunction, Request, Response } from "express";
import { AuthorDTO } from "@/DTO/AuthorDTO";
import { AuthorService } from "@/services/AuthorService";
import { ResponseBodyInterface } from "@/DTO/ResponseBody";

export class AuthorController {
  private authorService: AuthorService;

  constructor() {
    this.authorService = new AuthorService();
  }

  public async create(
    req: Request<{}, {}, AuthorDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.authorService.create(req.body);

      const response: ResponseBodyInterface = {
        statusCode: 201,
        message: "Autor foi criado com sucesso",
      };

      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }
}

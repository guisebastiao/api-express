import { NextFunction, Request, Response } from "express";
import { GenreDTO } from "@/DTO/GenreDTO";
import { GenreService } from "@/services/GenreService";
import { ResponseBodyInterface } from "@/DTO/ResponseBody";

export class GenreController {
  private genreService: GenreService;

  constructor() {
    this.genreService = new GenreService();
  }

  public async create(
    req: Request<{}, {}, GenreDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const genre = await this.genreService.create(req.body);

      const response: ResponseBodyInterface = {
        statusCode: 201,
        message: "O gênero " + genre.name + " foi criado com sucesso",
      };

      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }
}

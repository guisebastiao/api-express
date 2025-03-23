import { GenreController } from "@/controllers/GenreController";
import { validateDTO } from "@/middlewares/validateDTO";
import loginRequired from "@/middlewares/loginRequired";
import { GenreValidate } from "@/DTO/GenreDTO";
import { Router } from "express";

export class GenreRoutes {
  private genreController: GenreController;
  private router: Router;

  constructor() {
    this.genreController = new GenreController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/",
      loginRequired,
      validateDTO(GenreValidate),
      this.genreController.create.bind(this.genreController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}

import express, { Express } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";

import { corsOptions } from "@/config/corsOptions";

import { serverErrorMiddleware } from "./middlewares/serverErrorMiddleware";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware";
import { AuthorRoutes } from "@/routes/AuthorRoutes";
import { AuthRoutes } from "@/routes/AuthRoutes";
import { GenreRoutes } from "@/routes/GenreRoutes";
import { BookRoutes } from "@/routes/BookRoutes";

export class App {
  private app: Express;
  private authRoutes: AuthRoutes;
  private authorRoutes: AuthorRoutes;
  private genreRoutes: GenreRoutes;
  private bookRoutes: BookRoutes;

  constructor() {
    this.app = express();
    this.authRoutes = new AuthRoutes();
    this.authorRoutes = new AuthorRoutes();
    this.genreRoutes = new GenreRoutes();
    this.bookRoutes = new BookRoutes();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(cors(corsOptions));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(hpp());
  }

  private routes(): void {
    this.app.use("/auth", this.authRoutes.getRouter());
    this.app.use("/authors", this.authorRoutes.getRouter());
    this.app.use("/genres", this.genreRoutes.getRouter());
    this.app.use("/books", this.bookRoutes.getRouter());

    this.app.use(notFoundMiddleware);
    this.app.use(serverErrorMiddleware);
  }

  public getServer(): Express {
    return this.app;
  }
}

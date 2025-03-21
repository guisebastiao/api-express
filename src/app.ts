import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";

import { corsOptions } from "./config/corsOptions";

import { errorHandler } from "./exception/ErrorHandler";
import { AuthRoutes } from "./routes/AuthRoutes";

export class App {
  private app: Express;
  private authRoutes: AuthRoutes;

  constructor() {
    this.app = express();
    this.authRoutes = new AuthRoutes();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(cors(corsOptions));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(hpp());
    this.app.use(errorHandler);
  }

  private routes(): void {
    this.app.use("/auth", this.authRoutes.getRouter());
  }

  public getServer(): Express {
    return this.app;
  }
}

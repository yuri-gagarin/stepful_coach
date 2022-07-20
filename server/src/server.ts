import express, { Router } from "express";
import next from "next";
// routes //
import CombineRoutes from "./routing/combineRoutes";
// db setup //
import setupDatabase from "./db/setupDB";
// types //
import type { Express, Request, Response } from "express";
import type { NextServer } from "next/dist/server/next";



class Server {
  // env vars //
  private dev: boolean = process.env.NODE_ENV !== "production";
  private PORT: number = process.env.PORT && parseInt(process.env.PORT) || 3000;
  private hostHame: string = process.env.HOST_NAME || "localhost";
  //
  private server: Express;
  private app: NextServer;
  private router: Router;
  
  constructor() {
    this.server = express();
    this.app =  next({ dev: this.dev, port: this.PORT, hostname: this.hostHame });
    this.router = Router();
  }

  public async launch(): Promise<Server> {
    try {
      await this.app.prepare()
      await this.configureDB();
      await this.configureServer();
      await this.configureRouter();

      this.server.listen(this.PORT, () => {
        console.log(`Ready on localhost:${this.PORT} - env ${process.env.NODE_ENV}`);
      });

      return this;
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  private async configureDB(): Promise<void> {
    await setupDatabase({ db: "stepful_coach_schedule" });
  }

  private async configureServer() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  private async configureRouter() {
    CombineRoutes(this.router);
    this.server.use(this.router);
    //
    const handle = this.app.getRequestHandler();
    this.server.all("*", (req: Request, res: Response) => {
      try {
        return handle(req, res);
      } catch (error) {
        console.log(error);
      }
    });
  }
}

export const ServerInstance = new Server().launch();
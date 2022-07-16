import express, { Router } from "express";
import next from "next";
// types //
import type { Express, Request, Response } from "express";
import type { NextServer } from "next/dist/server/next";



class Server {
  // env vars //
  private dev: boolean = process.env.NODE_ENV !== "production";
  private router: Router = Router();
  private PORT: number = process.env.PORT && parseInt(process.env.PORT) || 3000;
  private hostHame: string = process.env.HOST_NAME || "localhost";
  //
  private server: Express =  express();
  private app: NextServer = next({ dev: this.dev, port: this.PORT, hostname: this.hostHame });

  
  constructor() {
  }

  public async launch(): Promise<Server> {
    try {
      await this.app.prepare()
      await this.configureDB();
      await this.configureServer();
      await this.configureRouter();

      this.server.listen(this.PORT, () => {
        console.log(`Ready on localhost:${this.PORT} - env ${process.env.NODE_ENV}`);
      })
      return this;
    } catch (error) {
      throw error
    }
  }

  private async configureDB(): Promise<void> {

  }

  private async configureServer() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  private async configureRouter() {
    const handle = this.app.getRequestHandler();
    this.server.use(this.router);
    this.server.all("*", (req: Request, res: Response) => {
      try {
        return handle(req, res);
      } catch (error) {
        process.exit(1);
      }
    });
  }
}

export const ServerInstance = new Server().launch();
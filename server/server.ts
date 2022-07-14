import express from "express";
// types //
import type { Express, Router } from "express";
import type { NextServer } from "next/dist/server/next";



class Server {
  private server!: Express;
  private app!: NextServer;
  // env vars //
  private dev: boolean = process.env.NODE_ENV !== "production";
  private router!: Router;
  private PORT: number = process.env.PORT && parseInt(process.env.PORT) || 3000;
  private hostHame: string = process.env.HOST_NAME || "localhost";

  constructor() {
    this.configureServer();
  }


  private configureServer() {
    this.server = express();
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  private configureRouter() {
    
  }
}
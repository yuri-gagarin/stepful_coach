// test routes and controller //
import CoachsController from "../controllers/CoachsController";
import CoachRoutes from "./routes/coachRoutes"
// types interfaces //
import type { Router} from "express";

// this is maybe a weird, more rails like approach rather than nextJS //
export default function combineRoutes(router: Router): void {
  new CoachRoutes(router, new CoachsController()).init()
}
// test routes and controller //
import TestsController from "../controllers/TestsController";
import TestRoutes from "./routes/testRoutes";
// types interfaces //
import type { Router} from "express";


export default function combineRoutes(router: Router): void {
  new TestRoutes(router, new TestsController())
}
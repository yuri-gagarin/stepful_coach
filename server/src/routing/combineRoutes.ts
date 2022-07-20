// test routes and controller //
import CoachsController from "../controllers/CoachsController";
import CoachRoutes from "./routes/coachRoutes";
//
import MeetingsController from "../controllers/MeetingsController";
import MeetingRoutes from "./routes/meetingRoutes";
//
import StudentsController from "../controllers/StudentsController";
import StudentRoutes from "./routes/studentRoutes";
//
import WorkdaysController from "../controllers/WorkdaysController";
import WorkdayRoutes from "./routes/workdayRoutes";
// types interfaces //
import type { Router} from "express";

// this is maybe a weird, more rails like approach rather than nextJS //
export default function combineRoutes(router: Router): void {
  new CoachRoutes(router, new CoachsController()).init();
  new MeetingRoutes(router, new MeetingsController()).init();
  new StudentRoutes(router, new StudentsController()).init();
  new WorkdayRoutes(router, new WorkdaysController()).init();
}
import { Router } from "express";

export default class MeetingRoutes {
  private router: Router;
  private controller: any;

  constructor(router: Router, controller: any) {
    this.router = router;
    this.controller = controller;
  }

  init(): void {
    this.indexRoute("/api/meetings")
    this.createRoute("/api/meetings")
    this.editRoute("/api/meetings/:meeting_id")
  } 

  //
  private indexRoute(route: string): void {
    this.router
      .route(route)
      .get(this.controller.index);
  }
  private editRoute(route: string): void {
    this.router
      .route(route)
      .patch(this.controller.edit);
  }
  private createRoute(route: string): void {
    this.router
      .route(route)
      .post(this.controller.create);
  }
}
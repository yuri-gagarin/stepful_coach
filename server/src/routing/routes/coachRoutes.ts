import { Router } from "express";

export default class CoachRoutes {
  private router: Router;
  private controller: any;

  constructor(router: Router, controller: any) {
    this.router = router;
    this.controller = controller;
  }

  init(): void {
    this.indexRoute("/api/coaches")
    this.createRoute("/api/coaches")
  } 

  //
  private indexRoute(route: string): void {
    this.router
      .route(route)
      .get(this.controller.index)
  }

  private createRoute(route: string): void {
    this.router
      .route(route)
      .post(this.controller.create)
  }
}
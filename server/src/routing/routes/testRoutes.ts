import { Router } from "express";

export default class TestRoutes {
  private router: Router;
  private controller: any;

  constructor(router: Router, controller: any) {
    this.router = router;
    this.controller = controller;
  }

  init(): void {
    this.indexRoute("/api/test")
    this.createRoute("/api/test")
    this.deleteRoute("/api/test/:test_id")
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
  private deleteRoute(route: string): void {
    this.router
      .route(route)
      .delete(this.controller.delete)
  }  
}
import type { Request, Response } from "express";

export default class TestsController {

  constructor() {
    // this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  index(req: Request, res: Response): Response {
    return res.status(200).json({
      message: "TEST, INDEX route response"
    });
  }

  create(req: Request, res: Response): Response {
    return res.status(200).json({
      message: "Test, CREATE route response"
    });
  }

  delete(req: Request, res: Response): Response {
    return res.status(200).json({
      message: "Test, DELETE route response"
    })
  }
};


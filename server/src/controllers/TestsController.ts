import type { Request, Response } from "express";

export default class TestsController {

  index(req: Request, res: Response): Response {
    return res.send(200).json({
      message: "TEST, INDEX route response"
    });
  }

  create(req: Request, res: Response): Response {
    return res.send(200).json({
      message: "Test, CREATE route response"
    });
  }

  delete(req: Request, res: Response): Response {
    return res.send(200).json({
      message: "Test, DELETE route response"
    })
  }
};


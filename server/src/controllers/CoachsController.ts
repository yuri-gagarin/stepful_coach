import Coach from "../models/Coach";
// types, interfaces //
import type { Request, Response } from "express";
import type { ICoach } from "../models/Coach";


export const errorHelper = (res: Response, { message, error, status }: { message?: string; error: any; status?: number }): Response => {
  console.error(error);
  return res.status(status || 500).json({ message: message || error.message, error });
};

// we need index and create ?//

export default class CoachsController {

  constructor() {
    // or we could use arrow functions... but then we lose some possible future inheritance benefits //
    // if we wanted to implement a parent class and call super().... //
    // it really depends... //
    this.index = this.index.bind(this)

  }

  async index(req: Request, res: Response): Promise<any> {

  }

  async create(req: Request, res: Response): Promise<any> {
  
  }
  
}
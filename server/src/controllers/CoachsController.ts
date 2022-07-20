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
    try {
      const coaches: ICoach[] = await Coach.find({}).populate("availabilityDays").exec(); // that way students can the availability //
      return res.status(200).json({ message: "Active coaches", coaches });
    } catch (error) {
      return errorHelper(res, { error });
    }
  }

  async create(req: Request, res: Response): Promise<any> {
    const { name } = req.body as { name: string; };
    try {
      const newCoach: ICoach = await Coach.create({ name });
      return res.status(200).json({ message: "Created a coach", newCoach });
    } catch (error) {
      return errorHelper(res, { error });
    }
  }
  
}
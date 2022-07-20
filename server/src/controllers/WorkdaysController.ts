import Coach from "../models/Coach";
import Workday from "../models/Workday";
// types, interfaces //
import type { Request, Response } from "express";
import type { ICoach } from "../models/Coach";
import type { IWorkday } from "../models/Workday";

export const errorHelper = (res: Response, { message, error, status }: { message?: string; error: any; status?: number }): Response => {
  console.error(error);
  return res.status(status || 500).json({ message: message || error.message, error });
};


export default class WorkdaysController {

  constructor() {
    // or we could use arrow functions... but then we lose some possible future inheritance benefits //
    // if we wanted to implement a parent class and call super().... //
    // it really depends... //
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { coach_id } = req.params;

    try {
      const workdays: IWorkday[] = await Workday.find({ coach: coach_id }).exec();
      return res.status(200).json({
        message: "Your Workdays", workdays
      });
    } catch (error) {
      return errorHelper(res, { error });
    }
  }
  async create(req: Request, res: Response): Promise<any> {
    const { coachId, day, hours } = req.body as { coachId: string; day: string; hours: string[] };

    // this is BAD!!! very unrestful.... but works for now //
    // in reality if a workday already exists we should update it, but requires additional functionality //
    try {
      // 
      const existing = await Workday.findOne({ coach: coachId, day }).exec() 
      if (existing) {
        existing.hours = [ ...hours ];
         await existing.save();
        return res.status(200).json({ message: "New workday", newWorkday: existing });
      } else {
        const newWorkday: IWorkday = await Workday.create({ coach: coachId, day, hours });
        // update coach's workdays //
        const updatedCoach: ICoach | null = await Coach.findOneAndUpdate({ _id: coachId }, { $push: { availabilityDays: newWorkday._id } }, { new: true }).exec();
        return res.status(200).json({ message: "New workday", newWorkday, updatedCoach });
      }
    } catch (error) {
      return errorHelper(res, { error });
    }
  }
  
};


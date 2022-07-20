import Meeting from "../models/Meeting";
// types, interfaces //
import type { Request, Response } from "express";
import type { IMeeting } from "../models/Meeting";

export const errorHelper = (res: Response, { message, error, status }: { message?: string; error: any; status?: number }): Response => {
  console.error(error);
  return res.status(status || 500).json({ message: message || error.message, error });
};

// index, create, edit? //
export default class MeetingsController {

  constructor() {
    // or we could use arrow functions... but then we lose some possible future inheritance benefits //
    // if we wanted to implement a parent class and call super().... //
    // it really depends... //
    this.index = this.index.bind(this)
    this.create = this.create.bind(this)
    this.edit = this.edit.bind(this)
  }

  async index(req: Request, res: Response): Promise<any> {

  }
  async create(req: Request, res: Response): Promise<any> {
   
  }
  async edit(req: Request, res: Response): Promise<any> {
   
  }
}
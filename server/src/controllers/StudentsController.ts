import Student from "../models/Student";
// types, interfaces //
import type { Request, Response } from "express";
import type { IStudent } from "../models/Student";


export const errorHelper = (res: Response, { message, error, status }: { message?: string; error: any; status?: number }): Response => {
  console.error(error);
  return res.status(status || 500).json({ message: message || error.message, error });
};


export default class StudentsController {

  constructor() {
    // or we could use arrow functions... but then we lose some possible future inheritance benefits //
    // if we wanted to implement a parent class and call super().... //
    // it really depends... //
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
  }

  async index(req: Request, res: Response): Promise<any> {
    // do we need it ?
  }
  
  async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body as { name: string; };
    try {
      const newStudent: IStudent = await Student.create({ name });
      return res.status(200).json({ message: "Created a student", newStudent });
    } catch (error) {
      return errorHelper(res, { error });
    }
  }
  
}
import { faker } from "@faker-js/faker";
import TestModel from "../models/TestModel";
//
import type { Request, Response } from "express";
import type { ITestModel } from '../models/TestModel';

export default class TestsController {

  constructor() {
    // this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      console.log(this);
      const testModels: ITestModel[] = await TestModel.find({}).exec()
      return res.status(200).json({
        message: "TEST, INDEX route response", testModels 
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message,  error });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      console.log(this);
      const newTestModel: ITestModel = await TestModel.create({ title: faker.word.noun() });
      return res.status(200).json({
        message: "TEST, CREATE route response", newTestModel
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message,  error });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const model_id  = req.params.model_id
    try {
      console.log(this)
      const deletedTestModel: ITestModel | null = await TestModel.findOneAndDelete({ _id: model_id }).exec();
      if (deletedTestModel) {
        return res.status(200).json({ message: `DELETED: Model: ${deletedTestModel.title}`, deletedTestModel });
      } else {
        return res.status(404).json({ message: "Not found" });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message,  error });
    }
  }
};


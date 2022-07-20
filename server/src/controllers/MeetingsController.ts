import Coach from "../models/Coach";
import Meeting from "../models/Meeting";
import Student from "../models/Student";
import Workday from "../models/Workday";
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

  async index(req: Request, res: Response): Promise<Response> {
    const { coachId, completed = 0 } = req.query;
    try {
      const meetings: IMeeting[] = await Meeting.find({ coach: coachId, completed }).populate("student").exec(); // just so that we see the name of the student for the meeting //
      console.log(meetings[0])
      return res.status(200).json({ message: "Your meeetings", meetings });
    } catch (error) {
      return errorHelper(res, { error });
    }
  }
  async create(req: Request, res: Response): Promise<any> {
    const { coachId, studentId, day, time } = req.body as { coachId: string; studentId: string; day: string; time: string; };
    console.log(req.body);
    try {
      // update coaches availability //
      // create a meeting, updated Coach.meetings, Sudent.meetings  
      const newMeeting: IMeeting = await Meeting.create({ coach: coachId, student: studentId, time, day });
      await Coach.findOneAndUpdate({ _id: coachId }, { $push: { scheduledMeetings: newMeeting._id } }).exec();
      await Student.findOneAndUpdate({ _id: studentId }, { $push: { scheduledMeetings: newMeeting._id } }).exec();
      // technically we should be validating that this hour is indeed available that workday //
      const updatedWorkday = await Workday.findOneAndUpdate(
        { coach: coachId, day },
        { $pull: { hours: time }, $inc: { numOfMeeting: 1 } }
      ).exec();
      //
      return res.status(200).json({
        message: "A new meeting created", newMeeting
      });

    } catch (error: any) {
      return errorHelper(res, { error });
    }
  }
  async edit(req: Request, res: Response): Promise<Response> {
    const { meeting_id } = req.params;
    const { notes, rating } = req.body as { notes: string; rating: string };

    try {
      const editedMeeting: IMeeting | null = await Meeting.findOneAndUpdate(
        { _id: meeting_id },
        { $set: { completed: 1, meetingNotes: notes, rating } },
        { new: true }
      ).exec();
      if (editedMeeting) {
        return res.status(200).json({
          message: "Meeting updated/completed", editedMeeting
        })
      } else {
        return errorHelper(res, { error: new Error("Meeting not found"), status: 404 });
      }
    } catch (error: any) {
      return errorHelper(res, { error });
    }
  }
}
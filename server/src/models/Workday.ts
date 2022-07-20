import mongoose,  { Document, Schema } from "mongoose";

export interface IWorkday extends Document {
  coach: Schema.Types.ObjectId;
  hours: string[];
  day: string;
  data: Date;
  numOfMeetings: number;
}

const WorkdaySchema = new Schema(
  {
    coach: { type: Schema.Types.ObjectId, required: true, ref: "Coach" },
    hours: { type: [String], required: true },
    day: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    numOfMeetings: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IWorkday>("Workday", WorkdaySchema);

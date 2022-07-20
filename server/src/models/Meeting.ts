import mongoose, { Document, Schema } from "mongoose";

export interface IMeeting extends Document {
  _id: Schema.Types.ObjectId;
  coach: Schema.Types.ObjectId;
  student: Schema.Types.ObjectId;
  time: string;
  day: string;
  completed: number;
  rating: number;
  meetingNotes: string;
}
// schema //
const MeetingSchema = new Schema(
  {
    coach: { type: Schema.Types.ObjectId, ref: "Coach", required: true },
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    time: { type: String, required: true },
    day: { type: String, required: true },
    completed: { type: Number, enum: [0, 1], default: 0 },
    rating: { type: Number, enum: [ 1, 2, 3, 4, 5 ] },
    meetingNotes: { type: String }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IMeeting>("Meeting", MeetingSchema);


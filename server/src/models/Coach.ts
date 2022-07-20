import mongoose, { Document, Schema } from "mongoose";

export interface ICoach extends Document {
  name: string;
  availabilityDays: Schema.Types.ObjectId[];
  scheduledMeetings: Schema.Types.ObjectId[];
  completedMeetings: Schema.Types.ObjectId[];
}
const CoachSchema = new Schema(
  {
    name: { type: String, required: true },
    availabilityDays: { type: [ Schema.Types.ObjectId ], required: true, default: [], ref: "Workday" },
    scheduledMeetings: { type: [ Schema.Types.ObjectId ], required: true, default: [], ref: "Meeting" },
    completedMeetings: { type: [ Schema.Types.ObjectId ], required: true, default: [], ref: "Meeting" }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ICoach>("Coach", CoachSchema);

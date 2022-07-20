import mongoose, { Document, Schema } from "mongoose";

export interface IStudent extends Document {
  name: string;
  scheduledMeetings: Schema.Types.ObjectId[];
  completedMeetings: Schema.Types.ObjectId[];
}

const StudentSchema = new Schema(
  {
    name: { type: String, required: true },
    scheduledMeetings: { type: [ Schema.Types.ObjectId ], required: true, default: [] },
    completedMeetings: { type: [ Schema.Types.ObjectId ], required: true, default: [] }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IStudent>("Student", StudentSchema);

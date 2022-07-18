import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface ITestModel extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  editedAt: Date;
  createdAt: Date;
};

const testModelSchema = new Schema<ITestModel>({
    title: { 
      type: String, 
      required: [true, "Title is required" ], 
      index: true,
      validate: { 
        validator: async function (title: string) {
          const existingModel = await mongoose.models["TestModel"].findOne({ title }).exec();
          if (existingModel) return false;
          else return true;
        },
        message: () => "This specific title is already in use"
      }
    },
    description: { type: String }
  }, 
  {
    timestamps: true
  }
);

testModelSchema.pre("save", async function (next) {
  if (!this.description) {
    this.description = "No description was provided";
  }
});

export default mongoose.model<ITestModel>("TestModel", testModelSchema);


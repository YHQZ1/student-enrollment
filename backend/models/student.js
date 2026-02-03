import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    grade: String,
  },
  { timestamps: true },
);

export default mongoose.model("Student", studentSchema);

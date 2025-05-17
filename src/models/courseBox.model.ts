import { Schema, model, models } from "mongoose";

const EducationCenterSchema = new Schema({
  educationTitle: String,
  teacher: { type: Schema.Types.ObjectId, ref: "Teacher", unique: true },
  students: [{ type: Schema.Types.ObjectId, ref: "Student", unique: true }],
}, { timestamps: true });

const Education = models.EducationCenter || model("EducationCenter", EducationCenterSchema, "Education_center");

export default Education;

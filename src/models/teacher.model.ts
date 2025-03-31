import { Schema, model, models } from "mongoose";

const TeacherSchema = new Schema({
  teacherName: String,
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }] // Kurslar bilan bog‘lanish
}, { timestamps: true });

const Teacher = models.Teacher || model("Teacher", TeacherSchema);
export default Teacher;

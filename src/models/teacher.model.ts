import { InferSchemaType, Schema, model, models } from "mongoose";


const TeacherSchema = new Schema({
  teacherName: String,
  teacherSurname: String,
  teacherPhone: String,
  teacherPassword: String,
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }] // Kurslar bilan bog‘lanish
}, { timestamps: true });


export type TeacherType = InferSchemaType<typeof TeacherSchema>;

const Teacher = models.Teacher || model("Teacher", TeacherSchema);
export default Teacher;

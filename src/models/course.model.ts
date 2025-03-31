import { Schema, model, models } from "mongoose";



const CourseSchema = new Schema(
  {
    courseTitle: String,
    teacher: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
    students: [{ type: Schema.Types.ObjectId, ref: "Student" }], // Har bir kurs ichida studentlar massiv shaklida saqlanadi
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    days: { type: [String], required: true }

  },
  { timestamps: true }
);


const Course = models.Course || model("Course", CourseSchema);
export default Course;

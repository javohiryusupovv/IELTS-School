import { Schema, model, models } from "mongoose";

const EducationCenterSchema = new Schema({
  educationTitle: String,
  ownerName: String,
  phoneNumber: String,
  login: { type: String, unique: true},
  password: { type: String, unique: true},
  role: String,
  admins: [{ type: Schema.Types.ObjectId, ref: "AdministratorModel" }],
  teachers: [{ type: Schema.Types.ObjectId, ref: "Teacher" }],
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  shops: [{ type: Schema.Types.ObjectId, ref: "Shop" }],
  lastPayment: [{ type: Schema.Types.ObjectId, ref: "PaymentAdd" }],
}, { timestamps: true });

const Education = models.EducationCenter || model("EducationCenter", EducationCenterSchema, "Education_center");

export default Education;

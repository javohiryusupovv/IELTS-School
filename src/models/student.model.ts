import { Schema, model, models } from "mongoose";
import Course from "./course.model"
const CoinSchema = new Schema(
  {
    value: { type: Number, required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    reasons: [
      {
        reason: { type: String, required: true },
        value: { type: Number, required: true },
      },
    ],
  }
);

const PaymentSchema = new Schema(
  {
    amount: { type: Number, required: true }, // Summasi
    type: {
      type: String,
      enum: ["Naqd", "Karta", "Click"],
      required: true,
    }, // To'lov turi
    date: { type: Date, default: Date.now }, // To'langan sana
    status: { type: String, enum: ["to'langan", "qarzdor", "kutilmoqda"], default: "kutilmoqda" },
  },
  { timestamps: true }
);

const AttendanceSchema = new Schema(
  {
    date: { type: String, required: true }, // YYYY-MM-DD
    status: { type: String, enum: ["keldi", "kelmadi", "bosh"], required: true },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);


const StudentSchema = new Schema(
  {
    name: String,
    surname: String,
    phone: String,
    parentPhone: String,
    password: { type: String, unique: true },
    studentID: String,
    course: { type: Schema.Types.ObjectId, ref: "Course" }, // Kursga referens
    coins: [CoinSchema],
    lastDateCoin: { type: Date, default: null },
    educationCenter: { type: Schema.Types.ObjectId, ref: "EducationCenter" },
    publishStudent: { type: Boolean, default: false }, // Talabani ko'rsatish
    birthday: { type: Date },
    // 🔹 To'lovlar
    payments: [PaymentSchema],
    paymentNext: { type: Date },
    balance: { type: Number, default: 0 }, // Qoldiq summasi va student balansi
    attendance: [AttendanceSchema],
  },
  { timestamps: true }
);

const Student = models.Student || model("Student", StudentSchema);
export default Student;

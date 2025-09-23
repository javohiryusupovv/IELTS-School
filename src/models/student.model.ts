import { Schema, model, models } from "mongoose";

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
    nextPayment: { type: Date, required: true }, // Keyingi to'lov sanasi
    status: { type: String, enum: ["paid", "debt", "pending"],  default: "pending" },
  },
  { timestamps: true }
);

const StudentSchema = new Schema(
  {
    name: String,
    surname: String,
    phone: String,
    password: { type: String, unique: true },
    studentID: String,
    course: { type: Schema.Types.ObjectId, ref: "Course" }, // Kursga referens
    coins: [CoinSchema],
    lastDateCoin: { type: Date, default: null },
    educationCenter: { type: Schema.Types.ObjectId, ref: "EducationCenter" },
    publishStudent: { type: Boolean, default: false }, // Talabani ko'rsatish

    // 🔹 To'lovlar
    payments: [PaymentSchema],
  },
  { timestamps: true }
);

const Student = models.Student || model("Student", StudentSchema);
export default Student;

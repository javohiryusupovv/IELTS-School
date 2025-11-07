// app/api/cron/route.ts
import { NextResponse } from "next/server";
import Student from "@/models/student.model";
import ConnectMongoDB from "@/lib/mongodb";

export async function GET() {
  try {
    await ConnectMongoDB();

    const today = new Date();
    const students = await Student.find({ paymentNext: { $lte: today } }).populate("course");

    for (const student of students) {
      if (!student.course?.price) continue;

      // Qarzdorlik yozuvini qo‘shamiz
      student.payments.push({
        amount: student.course.price,
        type: "Naqd",
        date: new Date(student.paymentNext),
        status: "qarzdor",
      });

      student.balance -= student.course.price;

      const next = new Date(student.paymentNext);
      next.setMonth(next.getMonth() + 1);
      student.paymentNext = next;

      await student.save();
    }

    console.log(`💰 ${students.length} ta student uchun qarzdorlik yangilandi.`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Cron xatolik:", error);
    return NextResponse.json({ success: false, error: "Cron ishlamadi" }, { status: 500 });
  }
}

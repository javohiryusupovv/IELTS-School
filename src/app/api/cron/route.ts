"use server";

// app/api/cron/route.ts

import { NextResponse } from "next/server";
import Student from "@/models/student.model";
import ConnectMongoDB from "@/lib/mongodb";

export async function GET() {
  try {
    await ConnectMongoDB();

    const today = new Date();

    // to‘lov kuni bugungacha bo‘lganlar
    const students = await Student.find({
      paymentNext: { $lte: today },
    }).populate("course");

    let updatedCount = 0;

    for (const student of students) {
      if (!student.course?.price) continue;

      // Talaba bir necha oy to‘lamagan bo‘lsa, har oy uchun to‘lov yozamiz
      while (student.paymentNext <= today) {
        student.payments.push({
          amount: student.course.price,
          type: "Naqd",
          date: new Date(student.paymentNext),
          status: "qarzdor",
        });

        student.balance -= student.course.price;

        // Keyingi oyga o'tkazamiz
        const nextMonth = new Date(student.paymentNext);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        student.paymentNext = nextMonth;
      }

      await student.save();
      updatedCount++;
    }

    console.log(`💰 ${updatedCount} ta student uchun qarzdorlik yangilandi.`);
    return NextResponse.json({ success: true, updatedCount });
  } catch (error) {
    console.error("❌ Cron xatolik:", error);
    return NextResponse.json({ success: false, error: "Cron ishlamadi" }, { status: 500 });
  }
}

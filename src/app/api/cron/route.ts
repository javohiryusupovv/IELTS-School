import { NextResponse } from "next/server";
import Student from "@/models/student.model";
import Course from "@/models/course.model";
import ConnectMongoDB from "@/lib/mongodb";

export async function GET() {
  try {
    await ConnectMongoDB();

    // Barcha studentlarni olish
    const students = await Student.find().populate("course");

    for (const student of students) {
      if (student.course?.price) {
        student.balance -= student.course.price; // kurs narxini minus qilamiz
        await student.save();
      }
    }

    return NextResponse.json({ success: true, message: "Cron ishga tushdi, balans yangilandi!" });
  } catch (error) {
    console.error("Cron error:", error);
    return NextResponse.json({ success: false, error: "Cron ishlamadi" }, { status: 500 });
  }
}

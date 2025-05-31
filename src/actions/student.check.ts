"use server";

import ConnectMonogDB from "@/lib/mongodb";
import { revalidatePath } from "next/cache";

import {Course, Student, Teacher, Shop} from "@/models/index"
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export const StudentCheck = async (id: string, password: string, path: string) => {
  try {
    await ConnectMonogDB();

    const cleanedId = id.trim();
    const replaceID = "iq-" + cleanedId;

    const student = await Student.findOne({ studentID: replaceID }).populate("course");

    if (!student) {
      return { success: false, message: "Talaba ID noto'g'ri kiritilgan!" };
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return { success: false, message: "Parol noto'g'ri kiritilgan!" };
    }

    (await cookies()).set("student-auth", student._id.toString(), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60, // 1 soat
    });

    revalidatePath(path);

    return {
      success: true,
      message: "Kirish muvaffaqiyatli amalga oshirildi!",
      student: JSON.parse(JSON.stringify(student)),
    };
  } catch (error) {
    console.error("StudentCheck xatoligi:", error);
    throw new Error(`Xatolik yuz berdi: ${error}`);
  }
};

export const getStudentFromCookie = async () => {
  try {
    await ConnectMonogDB();
    const id = (await cookies()).get("student-auth")?.value;
    if (!id) return null;

    const student = await Student.findById(id).populate("course");
    return JSON.parse(JSON.stringify(student));
  } catch (err) {
    console.error("Studentni olishda xatolik:", err);
    return null;
  }
};


export const logOutStudent = async () => {
  try {
    (await cookies()).delete("student-auth");
    revalidatePath("/logstudent");
  } catch (error) {
    throw new Error(`Sizda Xatolik yuz berdi, ${error}`);
  }
}
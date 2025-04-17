"use server";

import ConnectMonogDB from "@/lib/mongodb";
import { revalidatePath } from "next/cache";

import {Course, Student, Teacher} from "@/models/index"
import { cookies } from "next/headers";

export const StudentCheck = async (id: string, path: string) => {
  try {
    await ConnectMonogDB();
    const cleanedId = id.trim();
    const replaceID = "iqtidor-"+cleanedId
    const student = await Student.findOne({ studentID: replaceID }).populate("course");
    
    if (!student) {
      console.log("O'quvchi topilmadi");
      return null;
    }

    (await cookies()).set("student-auth", student._id.toString(), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 hafta
    })

    revalidatePath(path)
    return JSON.parse(JSON.stringify(student));
  } catch (error) {
    throw new Error(`Sizda Xatolik yuz berdi, ${error}`);
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
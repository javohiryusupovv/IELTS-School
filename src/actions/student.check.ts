"use server";

import ConnectMonogDB from "@/lib/mongodb";
import Student from "@/models/student.model";
import { revalidatePath } from "next/cache";

export const StudentCheck = async (id: string, path: string) => {
  try {
    await ConnectMonogDB();
    const cleanedId = id.trim();
    const student = await Student.findOne({ studentID: cleanedId }).populate("course")
    
    if (!student) {
      console.log("O'quvchi topilmadi");
      return null;
    }
    revalidatePath(path)
    return JSON.parse(JSON.stringify(student));
  } catch (error) {
    throw new Error(`Sizda Xatolik yuz berdi, ${error}`);
  }
};

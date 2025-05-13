"use server";

import ConnectMonogDB from "@/lib/mongodb";
import mongoose from "mongoose";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import bcrypt from "bcryptjs";

import { Course, Student, Teacher } from "@/models/index";
import { IEditTeacher } from "../../app.types";

export const createTeacher = async (
  teacherName: string,
  teacherSurname: string,
  teacherPhone: string,
  teacherPassword1: string,
  role: string,
  path: string
) => {
  if (
    !teacherName.trim() ||
    !teacherSurname.trim() ||
    !teacherPhone.trim() ||
    !role.trim() ||
    !teacherPassword1.trim()
  )
    throw new Error("Teacher nomi kiritilmagan!");
  try {
    await ConnectMonogDB();
    const saltRounds = 10;
    const teacherPassword = await bcrypt.hash(teacherPassword1, saltRounds);
    const newTeacher = new Teacher({
      teacherName,
      teacherSurname,
      teacherPhone,
      teacherPassword,
      role
    });
    await newTeacher.save();
    revalidateTag("teachers");
    revalidatePath(path);
    return { success: true, message: "Teacher muvaffaqiyatli qo‘shildi!" };
  } catch (error) {
    throw new Error(`XAtolik yuz berdi Teacher saqlashda , ${error}`);
  }
};

export const getTeachers = async () => {
  try {
    await ConnectMonogDB();
    const getTeach = await Teacher.find(
      {},
      "_id teacherName teacherSurname teacherPhone courses"
    );
    return JSON.parse(JSON.stringify(getTeach)).map((teacher: any) => ({
      _id: teacher._id, // .populate() dan keyin _id string bo'lmasligi mumkin, lekin stringify qilganda string bo'ladi.
      teacherName: teacher.teacherName,
      teacherSurname: teacher.teacherSurname,
      teacherPhone: teacher.teacherPhone,
      teacherRole: teacher.role,
      courses: teacher.courses || [], // Endi bu yerda to'liq kurs obyektlari massivi bo'ladi
    }));
  } catch (error) {
    throw new Error(`XAtolik yuz berdi Teacher olishda , ${error}`);
  }
};

export const getTeacherById = async (teacherId: string) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        throw new Error(`noto'g'ri Teacher ID formati: ${teacherId}`);
      }
      await ConnectMonogDB();
      const teacherID = await Teacher.findById(teacherId).populate("courses");
      if (!teacherID) {
        throw new Error(`ID: ${teacherId} bo‘yicha o‘qituvchi topilmadi`);
      }
      return teacherID;
    } catch (error) {
      throw new Error(`sizda Xatolik yuz berdi teacher olishda ${error}`);
    }
}

export const deleteTeachers = async (teacherId: string, path: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      throw new Error(`noto'g'ri Teacher ID formati: ${teacherId}`);
    }
    await ConnectMonogDB();
    await Course.deleteMany({ teacher: teacherId });
    const teacher = await Teacher.findByIdAndDelete(teacherId);
    if (!teacher) {
      throw new Error(`ID: ${teacherId} bo‘yicha o‘qituvchi topilmadi`);
    }
    revalidatePath(path);
    return { success: true, message: "O'qituvchi muvaffaqiyatli o'chirildi!" };
  } catch (error) {
    throw new Error(`Xatolik yuz berdi Teacher o'chirishda , ${error}`);
  }
};

export const editTeacher = async ( teacherID: string, data: IEditTeacher, path: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(teacherID)) {
      throw new Error("Noto'g'ri ID!");
    }
    await ConnectMonogDB();

    if (data.teacherPassword) {
        const hashPassword = await bcrypt.hash(data.teacherPassword, 10);
        data.teacherPassword = hashPassword;
    }

    const updateTeacher = await Teacher.findByIdAndUpdate(teacherID, data, {new: true})
    if (!updateTeacher) {
        throw new Error("Talaba topilmadi!")
    }

    revalidateTag("teachers")
    revalidatePath(path)
    return JSON.parse(JSON.stringify(updateTeacher))
  } catch (error) {
    throw new Error("Teacher tahrirlashda Xatolik");
  }
};


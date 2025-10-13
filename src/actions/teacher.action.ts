"use server";

import ConnectMonogDB from "@/lib/mongodb";
import mongoose from "mongoose";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import bcrypt from "bcryptjs";

import { Course, Student, Teacher, Shop } from "@/models/index"
import { IEditTeacher } from "../../app.types";
import Education from "@/models/courseBox.model";

export const createTeacher = async (
  teacherName: string,
  teacherSurname: string,
  teacherPhone: string,
  teacherPassword1: string,
  role: string,
  educationCenterId: string,
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
      educationCenter: educationCenterId,
      role,
    });

    const education = await Education.findById(educationCenterId);
    if (!education) throw new Error("Education center topilmadi");
    education.teachers.push(newTeacher._id);

    await education.save();
    await newTeacher.save();

    revalidateTag("teachers");
    revalidatePath(path);
    return { success: true, message: "Teacher muvaffaqiyatli qo‘shildi!" };
  } catch (error) {
    throw new Error(`XAtolik yuz berdi Teacher saqlashda , ${error}`);
  }
};

export const getTeachers = async (educationCenter: string) => {
  try {
    await ConnectMonogDB();
    const teacher = await Education.findById(educationCenter)
    return JSON.parse(JSON.stringify(teacher))
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

export const deleteTeachers = async (teacherId: string, educationID: string, path: string) => {
  try {
    await ConnectMonogDB();

    // 1️⃣ ID formatini tekshirish
    if (!mongoose.Types.ObjectId.isValid(teacherId) || !mongoose.Types.ObjectId.isValid(educationID)) {
      throw new Error("Noto‘g‘ri ID formati");
    }

    // 2️⃣ Teacher mavjudligini tekshirish
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      throw new Error(`ID: ${teacherId} bo‘yicha o‘qituvchi topilmadi`);
    }

    // 3️⃣ O‘qituvchiga biriktirilgan kurslarni topish
    const teacherCourses = await Course.find({ teacher: teacherId });
    const courseIds = teacherCourses.map((c) => c._id);

    // 4️⃣ Shu kurslardagi barcha studentlarni topish
    const students = await Student.find({ course: { $in: courseIds } });
    const studentIds = students.map((s) => s._id);

    // 5️⃣ EducationCenter dagi teachers, courses, students massivlaridan tozalash
    await Education.findByIdAndUpdate(
      educationID,
      {
        $pull: {
          teachers: teacher._id,
          courses: { $in: courseIds },
          students: { $in: studentIds },
        },
      },
      { new: true }
    );

    // 6️⃣ Shu kurslardagi studentlarni o‘chirish
    await Student.deleteMany({ course: { $in: courseIds } });

    // 7️⃣ O‘qituvchiga tegishli kurslarni o‘chirish
    await Course.deleteMany({ teacher: teacherId });

    // 8️⃣ O‘qituvchini o‘chirish
    await Teacher.findByIdAndDelete(teacherId);

    // 9️⃣ UI keshni yangilash
    revalidateTag("teachers");
    revalidateTag("courses");
    revalidateTag("students");
    revalidatePath(path);

    return { success: true, message: "O‘qituvchi, kurslar va studentlar muvaffaqiyatli o‘chirildi!" };
  } catch (error: any) {
    console.error("❌ Xatolik deleteTeachers da:", error.message);
    throw new Error(`O‘qituvchini o‘chirishda xatolik: ${error.message}`);
  }
};

export const editTeacher = async (teacherID: string, data: IEditTeacher, path: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(teacherID)) {
      throw new Error("Noto'g'ri ID!");
    }
    await ConnectMonogDB();

    if (data.teacherPassword) {
      const hashPassword = await bcrypt.hash(data.teacherPassword, 10);
      data.teacherPassword = hashPassword;
    }

    const updateTeacher = await Teacher.findByIdAndUpdate(teacherID, data, { new: true })
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


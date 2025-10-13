"use server";

import ConnectMonogDB from "@/lib/mongodb";
import { ICourse } from "@/types/type";
import mongoose from "mongoose";
import { revalidatePath, revalidateTag } from "next/cache";

import { Course, Student, Teacher, Shop } from "@/models/index"
import { IUpdateCourse } from "../../app.types";
import Education from "@/models/courseBox.model";

// Muayyan kursni olish (kesh bilan)
export const getCourseById = async (kursId: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(kursId)) {
      throw new Error(`Noto‘g‘ri ID formati: ${kursId}`);
    }
    await ConnectMonogDB();
    const course = await Course.findById(kursId)
      .populate({
        path: "teacher",
        model: Teacher,
        select: "teacherName teacherSurname role",
      })
      .populate({
        path: "students",
        model: Student,
        match: { publishStudent: true },
        select: "name surname phone coins attendance",
      });
    if (!course) {
      return null;
    }
    return JSON.parse(JSON.stringify(course)) as ICourse;
  } catch (error) {
    console.error(`Error fetching course ${kursId}:`, error);
    throw new Error("Kursni olishda xatolik yuz berdi");
  }
};

// Yangi kurs yaratish
export const postCourse = async (
  courseTitle: string,
  teacherId: string,
  startDate: string,
  endDate: string,
  days: string[],
  path: string,
  price: number
) => {
  if (
    !courseTitle ||
    !teacherId ||
    !startDate ||
    !endDate ||
    days.length === 0
  ) {
    throw new Error("Barcha maydonlarni to‘ldirish shart");
  }

  try {
    await ConnectMonogDB();
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      throw new Error("Bunday ismli teacher topilmadi");
    }

    const educationCenterId = teacher.educationCenter;

    const newCourse = new Course({
      courseTitle,
      teacher: teacher._id,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      days,
      educationCenter: educationCenterId,
      price
    });
    await newCourse.save();

    await Teacher.findByIdAndUpdate(teacherId, {
      $push: { courses: newCourse._id },
    });
    if (educationCenterId) {
      await Education.findByIdAndUpdate(educationCenterId, {
        $push: { courses: newCourse._id },
      });
    }

    // Keshni yangilash
    revalidateTag("courses");
    revalidateTag("course");
    revalidatePath(path);
  } catch (error) {
    console.error("Error creating course:", error);
    throw new Error("Kurs yaratishda xatolik yuz berdi");
  }
};

export const updateCourseServer = async (
  courseId: string,
  courseData: IUpdateCourse,
  path: string
) => {
  try {
    await ConnectMonogDB();

    // Eski kursni olish
    const oldCourse = await Course.findById(courseId);
    if (!oldCourse) throw new Error("Kurs topilmadi");

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: courseData },
      { new: true }
    );

    // Agar teacher o‘zgargan bo‘lsa:
    if (courseData.teacher && oldCourse.teacher.toString() !== courseData.teacher.toString()) {
      // Eski teacher'dan kursni olib tashlash
      await Teacher.findByIdAndUpdate(oldCourse.teacher, {
        $pull: { courses: courseId },
      });

      // Yangi teacher'ga kursni qo‘shish
      await Teacher.findByIdAndUpdate(courseData.teacher, {
        $addToSet: { courses: courseId },
      });
    }

    revalidatePath(path);
    return JSON.parse(JSON.stringify(updatedCourse));
  } catch (error) {
    console.error("Error updating course:", error);
    throw new Error("Kurs yangilanmadi");
  }
};


// Kursni o‘chirish
export const DeleteCourse = async (id: string, educationID: string, path: string) => {
  try {
    await ConnectMonogDB();

    // 1️⃣ ID formati tekshiruvi
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(educationID)) {
      throw new Error("Noto‘g‘ri ID formati");
    }

    // 2️⃣ Kursni topamiz
    const course = await Course.findById(id);
    if (!course) {
      throw new Error("Kurs topilmadi");
    }

    // 3️⃣ Shu kursga biriktirilgan studentlarni topamiz
    const students = await Student.find({ course: course._id });

    // 4️⃣ EducationCenter dan kursni o‘chirish
    await Education.findByIdAndUpdate(
      educationID,
      { $pull: { courses: course._id } },
      { new: true }
    );

    // 5️⃣ EducationCenter dan shu kursdagi studentlarni ham o‘chirish
    if (students.length > 0) {
      const studentIds = students.map((s) => s._id);
      await Education.findByIdAndUpdate(
        educationID,
        { $pull: { students: { $in: studentIds } } },
        { new: true }
      );
    }

    // 6️⃣ Shu kursga bog‘langan studentlarni o‘chirish
    await Student.deleteMany({ course: course._id });

    // 7️⃣ Kursni o‘chirish
    await Course.findByIdAndDelete(id);

    // 8️⃣ UI keshni yangilash
    revalidateTag("courses");
    revalidateTag("course");
    revalidateTag("students");
    revalidatePath(path);

  } catch (error: any) {
    console.error(`❌ Error deleting course ${id}:`, error.message);
    throw new Error(`Kursni o‘chirishda xatolik yuz berdi: ${error.message}`);
  }
};
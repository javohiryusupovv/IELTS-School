"use server";

import ConnectMonogDB from "@/lib/mongodb";
import { ICourse } from "@/types/type";
import mongoose from "mongoose";
import { revalidatePath, revalidateTag } from "next/cache";

import {Course, Student, Teacher, Shop} from "@/models/index"
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
        select: "name surname phone coins",
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
  path: string
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
    const updateCourseData = await Course.findByIdAndUpdate(
      courseId,
      { $set: courseData },
      { new: true }
    );
    revalidatePath(path);
    return JSON.parse(JSON.stringify(updateCourseData));
  } catch (error) {
    throw new Error("Kurs Yangilanmadi");
  }
};

// Kursni o‘chirish
export const DeleteCourse = async (id: string, path: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`Noto‘g‘ri ID formati: ${id}`);
    }
    await ConnectMonogDB();
    const course = await Course.findByIdAndDelete(id);
    if (course.educationCenter) {
      await Education.findByIdAndUpdate(course.educationCenter, {
        $pull: { courses: course._id },
      });
    }
    if (!course) {
      throw new Error("Kurs topilmadi");
    }

    await Student.deleteMany({ course: course._id });

    // Keshni yangilash
    revalidateTag("courses");
    revalidateTag("course");
    revalidateTag("students");
    revalidatePath(path);
  } catch (error) {
    console.error(`Error deleting course ${id}:`, error);
    throw new Error("Kursni o‘chirishda xatolik yuz berdi");
  }
};

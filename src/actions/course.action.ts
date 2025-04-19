"use server"

import ConnectMonogDB from "@/lib/mongodb"
import { ICourse } from "@/types/type"
import mongoose from "mongoose"
import { unstable_cache } from "next/cache"
import { revalidatePath, revalidateTag } from "next/cache"

import { Course, Student, Teacher } from "@/models/index"

// Barcha kurslarni olish (kesh bilan)
export const getCourses = unstable_cache(
  async () => {
    try {
      await ConnectMonogDB()
      const courses = await Course.find().lean()
      return JSON.parse(JSON.stringify(courses)) as ICourse[]
    } catch (error) {
      console.error("Error fetching courses:", error)
      throw new Error("Kurslarni olishda xatolik yuz berdi")
    }
  },
  ["courses"],
  { revalidate: 3600, tags: ["courses"] } // 1 soatlik kesh
)

// Muayyan kursni olish (kesh bilan)
export const getCourseById = unstable_cache(
  async (kursId: string) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(kursId)) {
        throw new Error(`Noto‘g‘ri ID formati: ${kursId}`)
      }
      await ConnectMonogDB()
      const course = await Course.findById(kursId)
        .populate({
          path: "teacher",
          model: Teacher,
          select: "teacherName teacherSurname",
        })
        .populate({
          path: "students",
          model: Student,
          match: { publishStudent: true },
          select: "name surname phone",
        })
      if (!course) {
        throw new Error("Kurs topilmadi")
      }
      return JSON.parse(JSON.stringify(course)) as ICourse
    } catch (error) {
      console.error(`Error fetching course ${kursId}:`, error)
      throw new Error("Kursni olishda xatolik yuz berdi")
    }
  },
  ["course"], // Statik kesh kaliti
  { revalidate: 3600, tags: ["course"] } // Umumiy "course" tegi
)

// Yangi kurs yaratish
export const postCourse = async (courseTitle: string, teacherId: string, startDate: string, endDate: string, days: string[], path: string) => {
  if (!courseTitle || !teacherId || !startDate || !endDate || days.length === 0) {
    throw new Error("Barcha maydonlarni to‘ldirish shart")
  }

  try {
    await ConnectMonogDB()
    const teacher = await Teacher.findById(teacherId)
    if (!teacher) {
      throw new Error("Bunday ismli teacher topilmadi")
    }
    const newCourse = new Course({
      courseTitle,
      teacher: teacher._id,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      days,
    })
    await newCourse.save()

    await Teacher.findByIdAndUpdate(teacherId, {
      $push: { courses: newCourse._id },
    })

    // Keshni yangilash
    revalidateTag("courses")
    revalidateTag("course")
    revalidatePath(path)
  } catch (error) {
    console.error("Error creating course:", error)
    throw new Error("Kurs yaratishda xatolik yuz berdi")
  }
}

// Kursni o‘chirish
export const DeleteCourse = async (id: string, path: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`Noto‘g‘ri ID formati: ${id}`)
    }
    await ConnectMonogDB()
    const course = await Course.findByIdAndDelete(id)
    if (!course) {
      throw new Error("Kurs topilmadi")
    }

    // Keshni yangilash
    revalidateTag("courses")
    revalidateTag("course")
    revalidatePath(path)
  } catch (error) {
    console.error(`Error deleting course ${id}:`, error)
    throw new Error("Kursni o‘chirishda xatolik yuz berdi")
  }
}
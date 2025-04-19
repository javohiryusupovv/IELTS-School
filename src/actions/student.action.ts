"use server"

import ConnectMonogDB from "@/lib/mongodb"
import mongoose from "mongoose"
import { unstable_cache } from "next/cache"
import { revalidatePath, revalidateTag } from "next/cache"
import moment from "moment"

import { Course, Student, Teacher } from "@/models/index"

// Barcha talabalarni olish (kesh bilan)
export const getStudents = unstable_cache(
  async () => {
    try {
      await ConnectMonogDB()
      const courses = await Course.find()
        .populate({
          path: "students",
          model: Student,
          select: "name surname phone studentID publishStudent course", // Faqat kerakli maydonlar
        })
        .lean() // Performansi oshirish uchun
      const plainCourses = courses.map((course) => ({
        ...course,
        _id: course._id,
        students: course.students.map((student: any) => ({
          ...student,
          _id: student._id.toString(),
          course: student.course.toString(),
          courseTitle: course.courseTitle,
        })),
        teacher: course.teacher.toString(),
      }))
      return plainCourses
    } catch (error) {
      console.error("Error fetching students:", error)
      throw new Error("Talabalarni olishda xatolik yuz berdi")
    }
  },
  ["students"], // Kesh kaliti
  { revalidate: 3600, tags: ["students"] } // 1 soatlik kesh
)

// Muayyan talabani olish (kesh bilan)
export const getStudentById = unstable_cache(
  async (studentId: string) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        throw new Error("Noto‘g‘ri ID!")
      }
      await ConnectMonogDB()
      const student = await Student.findById(studentId)
        .populate({
          path: "course",
          model: Course,
          select: "courseTitle", // Faqat kerakli maydon
        })
        .lean() // Performansi oshirish uchun
      if (!student) {
        throw new Error("Talaba topilmadi!")
      }
      return JSON.parse(JSON.stringify(student))
    } catch (error) {
      console.error(`Error fetching student ${studentId}:`, error)
      throw new Error("Talabani olishda xatolik yuz berdi")
    }
  },
  ["student"], // Statik kesh kaliti
  { revalidate: 3600, tags: ["student"] } // Umumiy "student" tegi
)

// Yangi talaba qo‘shish
export const postAddStudent = async ( courseId: string, name: string, surname: string, phone: string, studentID: string, path: string) => {
  if (!name || !surname || !phone || !courseId || !studentID) {
    throw new Error("Barcha maydonlarni to‘ldirish shart!")
  }

  try {
    await ConnectMonogDB()
    const course = await Course.findById(courseId)
    if (!course) {
      throw new Error("Kurs topilmadi!")
    }

    const newStudent = new Student({
      name,
      surname,
      phone,
      studentID,
      course: courseId,
      publishStudent: false,
    })
    await newStudent.save()

    course.students.push(newStudent._id)
    await course.save()

    // Keshni yangilash
    revalidateTag("students")
    revalidateTag("student")
    revalidatePath(path)
    return { success: true, message: "Talaba muvaffaqiyatli qo‘shildi!" }
  } catch (error) {
    console.error("Error adding student:", error)
    throw new Error("Talaba qo‘shishda xatolik yuz berdi")
  }
}

// Talabani o‘chirish
export const deleteStudent = async (studentId: string, courseId: string, path: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(courseId)) {
      throw new Error("Noto‘g‘ri ID!")
    }
    await ConnectMonogDB()
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { students: new mongoose.Types.ObjectId(studentId) } },
      { new: true }
    )
    if (!updatedCourse) {
      throw new Error("Kurs topilmadi yoki talaba o‘chirilmadi!")
    }
    const deletedStudent = await Student.findByIdAndDelete(studentId)
    if (!deletedStudent) {
      throw new Error("Talaba topilmadi yoki o‘chirilmadi!")
    }

    // Keshni yangilash
    revalidateTag("students")
    revalidateTag("student")
    revalidatePath(path)
    return { success: true, message: "Talaba muvaffaqiyatli o‘chirildi!" }
  } catch (error) {
    console.error(`Error deleting student ${studentId}:`, error)
    throw new Error("Talabani o‘chirishda xatolik yuz berdi")
  }
}

// Talaba statusini yangilash
export const ActiveStudent = async (id: string, status: boolean, path: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Noto‘g‘ri ID!")
    }
    await ConnectMonogDB()
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { publishStudent: status },
      { new: true }
    )
    if (!updatedStudent) {
      throw new Error("Talaba topilmadi!")
    }

    // Keshni yangilash
    revalidateTag("students")
    revalidateTag("student")
    revalidatePath(path)
    return { success: true, message: "Talaba statusi yangilandi!" }
  } catch (error) {
    console.error(`Error updating student status ${id}:`, error)
    throw new Error("Talaba statusini yangilashda xatolik yuz berdi")
  }
}

// Talaba ma‘lumotlarini yangilash
export const updateStudent = async (
  studentId: string,
  data: { name: string; surname: string; phone: string },
  path: string
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      throw new Error("Noto‘g‘ri ID!")
    }
    if (!data.name || !data.surname || !data.phone) {
      throw new Error("Barcha maydonlarni to‘ldirish shart!")
    }
    await ConnectMonogDB()
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      {
        name: data.name,
        surname: data.surname,
        phone: data.phone,
      },
      { new: true }
    )
    if (!updatedStudent) {
      throw new Error("Talaba topilmadi!")
    }

    // Keshni yangilash
    revalidateTag("students")
    revalidateTag("student")
    revalidatePath(path)
    return JSON.parse(JSON.stringify(updatedStudent))
  } catch (error) {
    console.error(`Error updating student ${studentId}:`, error)
    throw new Error("Talaba ma‘lumotlarini yangilashda xatolik yuz berdi")
  }
}

// Talabaga coin qo‘shish
export const addCoins = async (studentId: string, coinValue: number) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      throw new Error("Noto‘g‘ri ID!")
    }
    if (coinValue <= 0) {
      throw new Error("Coin qiymati musbat bo‘lishi kerak!")
    }
    await ConnectMonogDB()
    const student = await Student.findById(studentId)
    if (!student) {
      throw new Error("Talaba topilmadi!")
    }

    const today = moment().format("YYYY-MM-DD")
    student.coins.push({ value: coinValue, date: today })
    student.lastDateCoin = today
    await student.save()

    // Keshni yangilash
    revalidateTag("students")
    revalidateTag("student")
    return { success: true, message: "Coin muvaffaqiyatli qo‘shildi!" }
  } catch (error) {
    console.error(`Error adding coins to student ${studentId}:`, error)
    throw new Error("Coin qo‘shishda xatolik yuz berdi")
  }
}

// Talabadan coin ayirish
export const salesUpdateCoins = async (studentId: string, coinValue: number, path: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      throw new Error("Noto‘g‘ri ID!")
    }
    if (coinValue <= 0) {
      throw new Error("Coin qiymati musbat bo‘lishi kerak!")
    }
    await ConnectMonogDB()
    const student = await Student.findById(studentId)
    if (!student) {
      throw new Error("Talaba topilmadi!")
    }

    const today = moment().format("YYYY-MM-DD")
    student.coins.push({
      value: -coinValue,
      date: today,
    })
    await student.save()

    // Keshni yangilash
    revalidateTag("students")
    revalidateTag("student")
    revalidatePath(path)
    return { success: true, message: "Coin muvaffaqiyatli ayirildi!" }
  } catch (error) {
    console.error(`Error subtracting coins from student ${studentId}:`, error)
    throw new Error("Coin ayirishda xatolik yuz berdi")
  }
}
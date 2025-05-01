"use server"

import ConnectMonogDB from "@/lib/mongodb"
import mongoose from "mongoose"
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache"
import bcrypt from 'bcryptjs';

import { Course, Student, Teacher } from "@/models/index"


export const createTeacher = async (teacherName: string, teacherSurname: string, teacherPhone: string, teacherPassword1: string, path: string) => {
    if (!teacherName.trim() || !teacherSurname.trim() || !teacherPhone.trim() || !teacherPassword1.trim()) throw new Error("Teacher nomi kiritilmagan!");
    try {
        await ConnectMonogDB()
        const saltRounds = 10;
        const teacherPassword = await bcrypt.hash(teacherPassword1, saltRounds);
        const newTeacher = new Teacher({ teacherName, teacherSurname, teacherPhone, teacherPassword })
        await newTeacher.save()
        revalidateTag("teachers")
        revalidatePath(path)
        return { success: true, message: "Teacher muvaffaqiyatli qo‘shildi!" };
    } catch (error) {
        throw new Error(`XAtolik yuz berdi Teacher saqlashda , ${error}`)
    }
}

export const getTeachers = async () => {
        try {
            await ConnectMonogDB()
            const getTeach = await Teacher.find({}, "_id teacherName teacherSurname courses")
            return JSON.parse(JSON.stringify(getTeach)).map((teacher: any) => ({
                _id: teacher._id, // .populate() dan keyin _id string bo'lmasligi mumkin, lekin stringify qilganda string bo'ladi.
                teacherName: teacher.teacherName,
                teacherSurname: teacher.teacherSurname,
                courses: teacher.courses || [], // Endi bu yerda to'liq kurs obyektlari massivi bo'ladi
            }));
        } catch (error) {
            throw new Error(`XAtolik yuz berdi Teacher olishda , ${error}`)
        }
    }


export const getTeacherById = unstable_cache(
    async (teacherId: string) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(teacherId)) {
                throw new Error(`noto'g'ri Teacher ID formati: ${teacherId}`);
            }
            await ConnectMonogDB();
            const teacherID = await Teacher.findById(teacherId).populate("courses")
            if (!teacherID) {
                throw new Error(`ID: ${teacherId} bo‘yicha o‘qituvchi topilmadi`);
            }

            return teacherID
        } catch (error) {
            throw new Error(`sizda Xatolik yuz berdi teacher olishda ${error}`)
        }
    },
    ["teacher"], // Statik kesh kaliti
    { revalidate: 3600, tags: ["teacher"] } // Umumiy "teacher" tegi
)


"use server"

import ConnectMonogDB from "@/lib/mongodb"
import { ICourse } from "@/types/type"
import mongoose from "mongoose"
import { revalidatePath } from "next/cache"

import {Course, Student, Teacher} from "@/models/index"


export const getCourses  = async()=> {
    try{
        await ConnectMonogDB()
        const courses = await Course.find()
        return courses as ICourse[]
    }catch(error){
        throw new Error(`Sizda Xatolik yuz berdi Courselarni olishda  ${error}`)
    }
}


export const getCourseById = async (kursId: string) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(kursId)) {
            throw new Error(`Noto‘g‘ri ID formati: ${kursId}`);
        }
        await ConnectMonogDB();
        const course = await Course.findById(kursId).populate({
            path: "teacher",
            model: Teacher
        })
        .populate({
            path: "students",
            model: Student, // Talabalar modeli nomini to'g'ri ko'rsating
            match: { publishStudent: true },
        })
        return course as ICourse;
    } catch (error) {
        throw new Error(`Sizda ID olishda xatolik yuz berdi: ${error}`);
    }
};


export const postCourse = async(courseTitle: string, teacherId: string, startDate: string, endDate: string, days: string[], path: string) => {
    if(!courseTitle || !teacherId || !startDate || !endDate || days.length === 0){
        throw new Error(`Xatolik yuz berdi Courseni POST qilishda`)
    }

    try{
        await ConnectMonogDB()
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            throw new Error("Bunday ismli teacher topilmadi");
        }
        const newCourse = new Course({
            courseTitle,
            teacher: teacher._id,// ObjectId string sifatida kelyapti, qo‘shimcha `.toString()` shart emas
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            days 
        });
        await newCourse.save();

        await Teacher.findByIdAndUpdate(teacherId, {
            $push: {courses: newCourse._id}
        })
        revalidatePath(path)
    }catch(error){
        throw new Error(`Xatolik yuz berid POST Courseda, ${error}`)
    }
}



export const DeleteCourse = async(id: string, path: string) => {
    try{
        await ConnectMonogDB()
        await Course.findByIdAndDelete(id)
        revalidatePath(path)
    }catch(error){
        throw new Error('Something went wrong while deleting course!')
    }
}




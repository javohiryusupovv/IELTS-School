"use server"

import ConnectMonogDB from "@/lib/mongodb"
import Course from "@/models/course.model"
import Student from "@/models/student.model"
import Teacher from "@/models/teacher.model"
import { ICourse, ITeacher } from "@/types/type"
import mongoose from "mongoose"
import { revalidatePath } from "next/cache"


export const getCourses  = async()=> {
    try{
        await ConnectMonogDB()
        const courses = await Course.find().populate({
            path: "teacher",
            model: Teacher
        })
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




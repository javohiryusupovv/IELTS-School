"use server"

import ConnectMonogDB from "@/lib/mongodb"
import Teacher from "@/models/teacher.model"
import mongoose from "mongoose"


export const createTeacher = async(teacherName: string) => {
    if (!teacherName.trim()) throw new Error("Teacher nomi kiritilmagan!");
    try{
        await ConnectMonogDB()
        const newTeacher = new Teacher({teacherName})
        await newTeacher.save()
        return { success: true, message: "Teacher muvaffaqiyatli qo‘shildi!" };
    }catch(error){
        throw new Error (`XAtolik yuz berdi Teacher saqlashda , ${error}`)
    }
}

export const getTeachers = async() => {
    try{
        await ConnectMonogDB()
        const getTeach = await Teacher.find({}, "_id teacherName").lean()
        return getTeach.map((teacher) => ({
            _id: (teacher._id as mongoose.Types.ObjectId).toString(), // `_id` ni stringga aylantiramiz
            teacherName: teacher.teacherName,
            courses: teacher.courses || [],
        }));
    }catch(error){
        throw new Error (`XAtolik yuz berdi Teacher olishda , ${error}`)
    }
}
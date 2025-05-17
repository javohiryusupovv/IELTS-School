"use server";

import bcrypt from 'bcryptjs';
import ConnectMonogDB from "@/lib/mongodb";
import { revalidatePath } from "next/cache";

import {Course, Student, Teacher, Shop} from "@/models/index"


export const TeacherLogin = async(phoneNumber: string, password: string, path: string) => {
    try{
        await ConnectMonogDB()
        const teacher = await Teacher.findOne({teacherPhone: phoneNumber}).populate({ path: 'courses', populate: { path: 'students' } });
        if(!teacher){
            console.log(`O'qituvchi topilmadi`);
            return null
        }        
        const passwordmatch = await bcrypt.compare(password, teacher.teacherPassword)
        if(!passwordmatch){
            console.log(`Password topilmadi`);
            return null
        }
        revalidatePath(path)
        return JSON.parse(JSON.stringify(teacher));
    }catch(error){
        console.error("O'qituvchini qidirishda xatolik:", error);
        return null; // Xatolik yuz berdi
    }
}


export const LogoutTeacher = async(path: string) => {
    try{
        if(path){
            revalidatePath(path)
        }

        return { success: true }
    }catch(error){
        throw new Error(`Sizda Xatolik yuz berdi, Logoutda , ${error}`)
    }
}

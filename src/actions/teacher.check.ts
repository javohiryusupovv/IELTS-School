"use server";

import bcrypt from "bcrypt";
import ConnectMonogDB from "@/lib/mongodb";
import { revalidatePath } from "next/cache";

import {Course, Student, Teacher} from "@/models/index"


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

export const ResetPasswordAction = async(teacherId: string, newpassword: string, path: string) => {
    try{
        await ConnectMonogDB();

        const hashPassword = await bcrypt.hash(newpassword, 10);
        await Teacher.findByIdAndUpdate(teacherId, { teacherPassword: hashPassword }, { new: true });
        revalidatePath(path);
        return { success: true, newpassword };
    }catch(error){
        throw new Error(`Sizda Xatolik yuz berdi, NewPasswordda , ${error}`)
    }
}
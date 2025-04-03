"use server";

import bcrypt from "bcrypt";
import Teacher from "@/models/teacher.model";
import ConnectMonogDB from "@/lib/mongodb";


export const TeacherLogin = async(phoneNumber: string, password: string) => {
    try{
        await ConnectMonogDB()
        const teacher = await Teacher.findOne({teacherPhone: phoneNumber}).populate({
            path: 'courses',
            populate: { path: 'students'}
        })
        if(!teacher){
            console.log(`O'qituvchi topilmadi`);
            return null
        }        
        const passwordmatch = await bcrypt.compare(password, teacher.teacherPassword)

        if(!passwordmatch){
            console.log(`Password topilmadi`);
            return null
        }
        return JSON.parse(JSON.stringify(teacher));
    }catch(error){
        console.error("O'qituvchini qidirishda xatolik:", error);
        return null; // Xatolik yuz berdi
    }
}
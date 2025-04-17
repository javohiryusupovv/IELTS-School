"use server"

import ConnectMonogDB from "@/lib/mongodb"
import mongoose from "mongoose"
import { revalidatePath } from "next/cache";
import moment from "moment";

import {Course, Student, Teacher} from "@/models/index"


export const postAddStudent = async (courseId: string, name: string, surname: string, phone: string, studentID: string, path: string) => {
    if (!name || !surname || !phone || !courseId) {
        throw new Error("Xatolik yuz berdi: Ma'lumotlar to'liq emas!");
    }

    try {
        await ConnectMonogDB();

        // Kursni topamiz
        const course = await Course.findById(courseId);
        if (!course) {
            throw new Error("Kurs topilmadi!");
        }

        // Yangi student yaratamiz va saqlaymiz
        const newStudent = new Student({
            name,
            surname,
            phone,
            studentID,
            course: courseId, // Student qaysi kursga tegishli ekanligi
            publishStudent: false
        });

        await newStudent.save();

        // Kursga studentni qo‘shamiz
        course.students.push(newStudent._id);
        await course.save();
        revalidatePath(path)
        return { success: true, message: "O‘quvchi muvaffaqiyatli qo‘shildi!", };
    } catch (error) {
        console.error("Student qo‘shishda xatolik:", error);
        throw new Error(`Student qo‘shishda xatolik yuz berdi!`);
    }
};


export const getStudentById = async (studentId: string) => {
    try {
        await ConnectMonogDB();
        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            throw new Error("Noto‘g‘ri ID!");
        }
        const student = await Student.findById(studentId).populate("course");
        if (!student) {
            throw new Error("Student topilmadi!");
        }
        return student;
    } catch (error) {
        console.error("Student olishda xatolik:", error);
        throw new Error(`Student olishda xatolik yuz berdi!`);
    }
}



export const getStudents = async () => {
    try {
        await ConnectMonogDB();
        const course = await Course.find().populate("students")
        const plainCourses = course.map(course => ({
            ...course.toObject(),
            _id: course._id.toString(),
            students: course.students.map((student: any) => ({
                ...student.toObject(),
                _id: student._id.toString(),
                course: student.course.toString(), // ObjectId ni stringga o'tkazish
                courseTitle: course.courseTitle,
            })),
            teacher: course.teacher.toString()
        }));
        return plainCourses

    } catch (error) {
        console.error("Student olishda xatolik:", error);
        throw new Error(`Student olishda xatolik yuz berdi!`);
    }
}


export const deleteStudent = async (studentId: string, courseId: string, path: string) => {
    try {
        await ConnectMonogDB();
        if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(courseId)) {
            throw new Error("Noto‘g‘ri ID!");
        }
        console.log(`Kurs ID: ${courseId}, O‘quvchi ID: ${studentId}`);
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $pull: { students: new mongoose.Types.ObjectId(studentId) } },
            { new: true }
        );
        if (!updatedCourse) {
            throw new Error("Kurs topilmadi yoki o‘quvchi o‘chirilmadi!");
        }
        const deleteStudentsModel = await Student.findByIdAndDelete(studentId);
        if (!deleteStudentsModel) {
            throw new Error("O‘quvchi topilmadi yoki o‘chirilmadi!");
        }

        revalidatePath(path)
        return { success: true, message: "O‘quvchi o‘chirildi!" };
    }
    catch (error) {
        console.error("O'quvchini o‘chirishda xatolik:", error);
        throw new Error(`O‘quvchini o‘chirishda xatolik yuz berdi!`);
    }
}


export const ActiveStudent = async (id: string, status: boolean, path: string) => {
    try{
        await ConnectMonogDB();
        await Student.findByIdAndUpdate(id, {publishStudent: status}, {new: true});
        revalidatePath(path)
    }catch(error){
        throw new Error(`O‘quvchini yangilashda xatolik yuz berdi!, ${error}`);
    }
}

export const updateStudent = async (studentId: string, data: {name: string, surname: string, phone: string}, path: string) => {
        try{
            await ConnectMonogDB();
            const updatedStudent =  await Student.findByIdAndUpdate(studentId, {
                name: data.name,
                surname: data.surname,
                phone: data.phone
            }, {new: true})
            revalidatePath(path)
            return updatedStudent
        }catch(error: any){
            // Extract the error message and throw it directly as a string
            throw new Error(`O‘quvchini yangilashda xatolik yuz berdi! ${error.message || error}`);
        }
    }





export const addCoins = async (studentId: string, coinValue: number) => {
    try {
        await ConnectMonogDB();
        const student = await Student.findById(studentId);
        if (!student) throw new Error("Student topilmadi");

        const today = moment().format("YYYY-MM-DD");  // Bugungi sana YYYY-MM-DD formatida

        student.coins.push({ value: coinValue, date: today });
        student.lastDateCoin = today;

        await student.save();
        return { success: true, message: "Coin muvaffaqiyatli qo‘shildi" };
    } catch (error) {
        throw new Error(`Xatolik yuz berdi coin qushishda, ${error}`)
    }
}


export const salesUpdateCoins = async(studentId: string, coinValue: number, path: string) => {
    try {
        await ConnectMonogDB();
    
        const student = await Student.findById(studentId);
        if (!student) throw new Error("Student topilmadi");
    
        const today = moment().format("YYYY-MM-DD");
    
        student.coins.push({
          value: -coinValue,
          date: today,
        });
    
        await student.save();
        revalidatePath(path)
        return { success: true, message: "Coin muvaffaqiyatli ayrildi" };
      } catch (error) {
        throw new Error(`Xatolik yuz berdi coin ayirishda, ${error}`);
      }
}
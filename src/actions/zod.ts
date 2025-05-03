
import {z} from 'zod'


export const IDSchema = z.object({
    idStudent: z.number()
    .min(1, {message: "ID 1 dan oshsin"})
    .max(5, {message: "ID 5 tadan oshmasligi kerak"})
})


export const TeacherSchemaZod = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Ism bo'sh bo'lmasligi kerak")
        .transform(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()),
    surname: z
        .string()
        .trim()
        .min(3, "Familiya bo'sh bo'lmasligi kerak")
        .transform(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()),
    password: z.string().trim().min(5, "Parol kamida 4 ta belgidan iborat bo'lishi kerak"),
})


export const CourseSchemaZod = z.object({
    title: z
    .string()
    .trim()
    .min(2, "Kurs nomi kiritilmadi")
    .transform(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase())
})
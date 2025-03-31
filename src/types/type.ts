import { StaticImageData } from "next/image";

export interface IProduct{
    id: number,
    image: string | StaticImageData,
    title: string,
    coin: number,
    description: string,
    qolganproduct: number,
    levelRequired: number
}

export interface IStudent{
    _id: string;
    courseId: string;
    name: string;
    surname: string;
    phone: string;
    coins: number[]
}

export interface ICourse{
    _id: string;
    courseTitle: string
    teacher: string | ITeacher,
    startDate: string,
    endDate: string,
    days: string[]
}


export interface ITeacher {
    _id: string; // MongoDB ObjectId string sifatida bo'ladi
    teacherName: string;
    courses: string[] | ICourse; // Kurslar ID-lari bo'lishi mumkin
  }
  
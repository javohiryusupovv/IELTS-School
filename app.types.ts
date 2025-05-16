import { ITeacher } from "@/types/type";

export interface IShops{
    _id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    activeProduct: boolean;

}

export interface IUpdateCourse{
    _id: string;
    courseTitle: string,
    startDate: string;
    endDate: string;
    days: string[];
    teacher: string | ITeacher;
}

export interface ICRMAccount {
    _id: string;
    fullname: string;
    login: string;
    password: string;
    phone: string;
    role: string;
}


export interface IEditTeacher{
    teacherName: string,
    teacherSurname: string,
    teacherPhone: string,
    teacherPassword?: string
}

export interface IPaymentAdd{
    _id: string,
    managerName: string,
    markazTitle: string,
    lastPayment: string,
    cashStatus: string,
    cashType: string
}

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
    courseTitle: string, 
    startDate: string;
    endDate: string;
    days: string[];
    teacher: string | ITeacher;
}
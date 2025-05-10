"use client"

import { ITeacher } from "@/types/type"
import { useEffect, useState } from "react"
import AccountImg from "../../../public/accountImg/users.png"
import Image from "next/image";
import Link from "next/link";
import { formatDate, getStableColor } from "../../../constants/page";
import { CalendarDays } from 'lucide-react';


export default function Page() {
    const [teacher, setTeacher] = useState<ITeacher | null>(null);

    useEffect(() => {
        const storageTeacher = localStorage.getItem("teacher");
        if (storageTeacher) {
            setTeacher(JSON.parse(storageTeacher));
        }
    }, []);

    console.log(teacher);
    

    

    if (!teacher) return <p>Loading...</p>;

    return (
        <div className="pt-10">
            <div className="flex gap-7 items-start w-[400px] h-[250px] p-5 rounded-md border shadow-lg shadow-gray-500/20">
                <article className="p-2 border w-[120px] h-[120px] rounded-full">
                     <Image className="w-full" src={AccountImg} alt="Account Img" />
                 </article>
                <article>
                    <p className="text-[20px] mb-1">{teacher.teacherSurname} {teacher.teacherName}</p>
                    <p className="text-[17px]">{teacher.teacherPhone}</p>
                </article>
            </div>

            <div className="w-full mt-10">
                <h6 className="text-[23px] font-medium mb-8">Kurslar</h6>
                <div className="grid grid-cols-4 gap-3">
                    {teacher.courses.map((course, index) => (
                        <Link href={`teacher/${course._id}`} key={index} className="p-7 rounded-md border shadow-md shadow-gray-200/30 cursor-pointer transition-all duration-200   " style={{backgroundColor: getStableColor(course._id).toString()}}>
                            <h1 className="text-xl mb-5 text-white">{course.courseTitle}</h1>
                            
                            <article className="flex gap-2 items-center mb-2 text-white">
                                <CalendarDays className="w-4 h-4"/>
                                <p className="text-[14px]">Boshlanish: {formatDate(course.startDate)}</p>
                            </article>
                            <article className="flex gap-2 items-center text-white">
                                <CalendarDays className="w-4 h-4"/>
                                <p className="text-[14px]">Tugash: {formatDate(course.endDate)}</p> 
                            </article>
                            
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

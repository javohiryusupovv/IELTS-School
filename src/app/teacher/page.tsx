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
        <div className="pt-10 max-sm:mt-[40px] ">
            <div className="flex gap-7 items-start md:w-[400px] md:h-[250px] p-5 rounded-md border shadow-lg shadow-gray-500/20">
                <article className="p-2 border md:w-[120px] md:h-[120px] w-[80px] h-[80px] flex items-center justify-center rounded-full">
                     <Image className="w-full" src={AccountImg} alt="Account Img" />
                 </article>
                <article>
                    <p className="md:text-[20px] text-[16px] mb-1">{teacher.teacherSurname} {teacher.teacherName}</p>
                    <p className="md:text-[17px] text-[14px] opacity-70">+998 {teacher.teacherPhone}</p>
                </article>
            </div>

            <div className="w-full mt-10 ">
                <h6 className="md:text-[23px] text-[18px] font-medium md:mb-8 mb-3">Kurslar</h6>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 course:grid-cols-2 gap-3 pb-10">
                    {teacher.courses.map((course, index) => (
                        <Link href={`teacher/${course._id}`} key={index} className="p-7 rounded-md border shadow-md shadow-gray-200/30 cursor-pointer transition-all duration-200 " style={{backgroundColor: getStableColor(course._id).toString()}}>
                            <h1 className="md:text-xl text-base line-clamp-1 md:mb-5 mb-2 text-white">{course.courseTitle}</h1>
                            <article className="flex gap-2 lg:items-center items-start mb-2 text-white">
                                <CalendarDays className="w-4 h-4"/>
                                <p className="sm:text-[14px] text-[12px]">Boshlanish: {formatDate(course.startDate)}</p>
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

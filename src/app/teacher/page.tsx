"use client"

import { ITeacher } from "@/types/type"
import { useEffect, useState } from "react"
import AccountImg from "../../../public/accountImg/azizbek.jpg"
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    const [teacher, setTeacher] = useState<ITeacher | null>(null);

    useEffect(() => {
        const storageTeacher = localStorage.getItem("teacher");
        if (storageTeacher) {
            setTeacher(JSON.parse(storageTeacher));
        }
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, "0");
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const year = date.getUTCFullYear();
        return `${day}-${month}-${year}`;
    };

    if (!teacher) return <p>Loading...</p>;

    return (
        <div className="pt-10">
            <div className="flex gap-7 items-start w-[400px] h-[250px] p-5 rounded-md border shadow-lg shadow-gray-500/20">
                    <Image className="w-[120px] h-[120px] rounded-full" src={AccountImg} alt="Account Img" />
                <article>
                    <p className="text-[20px] mb-1">{teacher.teacherSurname} {teacher.teacherName}</p>
                    <p className="text-[17px]">+998 {teacher.teacherPhone}</p>
                </article>
            </div>

            <div className="w-full mt-10">
                <h6 className="text-[23px] font-medium mb-8">Kurslar</h6>
                <div className="grid grid-cols-4 gap-3">
                    {teacher.courses.map((course, index) => (
                        <Link href={`teacher/${course._id}`} key={index} className="p-7 rounded-md border shadow-md shadow-gray-200/30 cursor-pointer transition-all duration-200 hover:bg-blue-300">
                            <h1 className="text-xl">{course.courseTitle}</h1>
                            <p>Boshlanish: {formatDate(course.startDate)}</p>
                            <p>Tugash: {formatDate(course.endDate)}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

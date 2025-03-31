import { getCourses } from "@/actions/course.action"
import { ICourse, ITeacher } from "@/types/type";
import { SquareUser } from 'lucide-react';
import Link from "next/link";
import TeacherCreated from "../_components/card/teacher-add";
import { getTeachers } from "@/actions/teacher.action"; 

export default async function DashboardTeacher() {
  const getTeacher = await getTeachers();
  console.log(getTeacher);
  
  return (
    <div>
        <article className="flex justify-between items-center mb-3">
            <h6 className="font-semibold text-[26px]">Bizning Mentorlar</h6>
            <TeacherCreated/>
        </article>
        <hr className="mb-7" />

        <div className="w-full grid grid-cols-4 gap-3">
          {getTeacher.map((teach: ITeacher, id: number)=> (
            <Link href={`/teacher`} key={id} className="cursor-pointer flex gap-2 items-center py-2 rounded-md pl-5 border">
              <SquareUser className=" stroke-gray-500"/>
              {teach?.teacherName}
            </Link>
          ))}
        </div>
    </div>
  )
}


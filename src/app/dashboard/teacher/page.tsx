import { SquareUser, UserRoundPlus } from 'lucide-react';
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

          {getTeacher.length < 1 ? (
          <div className='flex  items-center justify-center w-full h-[80vh]'>
            <article className='flex flex-col gap-2 items-center justify-center'>
              <UserRoundPlus className='w-[50px] h-10 stroke-gray-500 stroke-[1.4]'/>
              <p className='text-gray-500 text-lg'>Teacher qo'shing</p>
            </article>
          </div>
          ) : (
        <div className="w-full grid grid-cols-4 gap-3">
          {getTeacher.map((teach: any, id: number)=> (
            <Link href={`/dashboard/teacher/${teach._id}`} key={id} className="cursor-pointer flex gap-2 items-center py-2 rounded-md pl-5 border hover:text-orange-400 transition-all duration-200 hover:bg-accent">
              <SquareUser className=" stroke-gray-500"/>
              {teach?.teacherName} {teach.teacherSurname}
            </Link>
          ))}
        </div>
          )}
    </div>
  )
}


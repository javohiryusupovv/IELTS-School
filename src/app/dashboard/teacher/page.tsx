import { SquareUser, UserRoundPlus } from 'lucide-react';
import Link from "next/link";
import TeacherCreated from "../_components/card/teacher-add";
import { getTeachers } from "@/actions/teacher.action"; 
import ActionsTeacher from './_components/action';


export default async function DashboardTeacher() {
  const getTeacher = await getTeachers();  
  console.log(getTeacher);
  
  return (
    <div>
        <article className="flex items-center justify-between mb-3">
            <h6 className="font-semibold text-[26px] max-md:text-[20px] max-sm:text-[17px]">Bizning Mentorlar</h6>
            <TeacherCreated/>
        </article>
        <hr className="mb-7" />

          {getTeacher.length < 1 ? (
          <div className='flex  items-center justify-center w-full h-[80vh]'>
            <article className='flex flex-col items-center justify-center gap-2'>
              <UserRoundPlus className='w-[50px] h-10 stroke-gray-500 stroke-[1.4]'/>
              <p className='text-lg text-gray-500'>Teacher qo'shing</p>
            </article>
          </div>
          ) : (
        <div className="grid w-full grid-cols-4 gap-3 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {getTeacher.map((teach: any, id: number)=> (
            <div key={id} className='flex items-center justify-between px-3 py-2 border rounded-md'>
              <Link href={`/dashboard/teacher/${teach._id}`} className='flex items-center gap-2 transition-all duration-200 group hover:text-orange-400 hover:underline'>
                <SquareUser className=" stroke-gray-500"/>
                <span className='line-clamp-1'>{teach?.teacherName} {teach.teacherSurname}</span>
              </Link>
              <ActionsTeacher teacher={teach}/>
            </div>
          ))}
        </div>
          )}
    </div>
  )
}


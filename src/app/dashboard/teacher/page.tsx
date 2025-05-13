
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
        <article className="flex justify-between items-center mb-3">
            <h6 className="font-semibold md:text-[26px] text-lg">Bizning Mentorlar</h6>
            <TeacherCreated />
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
        <div className="w-full grid OurMentor:grid-cols-4 OurMentor2:grid-cols-3 sm:grid-cols-2 gap-3">
          {getTeacher.map((teach: any, id: number)=> (
            <div key={id} className='flex items-center py-2 justify-between px-3 border rounded-md'>
              <Link href={`/dashboard/teacher/${teach._id}`} className='group flex items-center gap-2 transition-all duration-200 hover:text-orange-400 hover:underline'>
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


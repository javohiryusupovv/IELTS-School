
import Image from "next/image";
import Frontend from "../../../../../public/img/kursSchema.png";
import { getCourseById } from "@/actions/course.action";
import Actions from "./_components/actions";
import { getStableColor } from "../../../../../constants/page";
import EditCourse from "./_components/editCourse";
import { IStudent } from "@/types/type";
import {  User } from 'lucide-react';
import Link from "next/link";



async function CourseDetail({ params, }: { params: Promise<{ kursId: string }> }) {
  const courseJSON = await getCourseById((await params).kursId)
  const course = JSON.parse(JSON.stringify(courseJSON));
  const students = course.students;
  

  if (!course) {
    return <h1>Kurs topilmadi</h1>;
  }


  return (
    <div className={`w-full`}>
      <article className="flex justify-between relative top-0 left-0">
        <h5 className="mb-5 text-[25px] max-md:text-[20px] max-sm:text-[17px]">{course.courseTitle}</h5>
        <EditCourse course={course} />
      </article>
      <div className="flex w-full gap-10 max-xl:flex-wrap">
        <div>
          <div className={`relative top-0 flex justify-center items-end border mb-5 w-[500px] max-sm:w-full h-[300px] rounded-xl max-md:h-[250px] max-sm:h-[200px] max-md:w-[380px]`} style={{ backgroundColor: getStableColor(course._id) }}>
            <p className="absolute top-8 max-sm:top-0 left-0 text-center w-full mt-12 text-[20px] font-semibold text-white">{course.courseTitle}</p>
            <Image className="w-[500px] max-sm:w-full object-cover" src={Frontend} alt="Course Detail Img" />
          </div>
          <h4 className="mb-3">O'qituvchi: <span className="font-semibold text-[19px]">{course.teacher.teacherName} {course.teacher.teacherSurname}</span></h4>
          <div className="flex items-center gap-3">
            <Actions course={course} />
          </div>

        </div>
        <div className="w-full px-5 py-3 rounded-md shadowCustom">
          <p className="text-[20px] font-medium text-center mb-5">O'quvchilar Jadvali</p>
          <div className="flex">
            <table className="w-full">
              {students.map((student: IStudent)=> (
                <tbody key={student._id}>
                  <tr className="group">
                    <td className=" group-hover:text-orange-500 transition-all duration-200 py-1 w-[300px]">
                      <Link href={`/dashboard/students/${student._id}`} className="flex items-center gap-1 font-light text-[13px] max-sm:items-start">
                        <User className="w-5 h-5 stroke-1"/>
                        {student.surname} {student.name}
                      </Link>
                    </td>
                    <td className="group-hover:text-orange-500 transition-all duration-200 text-left font-light text-[13px]">+998 {student.phone}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
import { getCourses } from "@/actions/course.action";
import StudentForm from "../_components/card/student-form";
import Action, { SearchFuture } from "./_components/action";
import { UserX } from 'lucide-react';
import { getStudents } from "@/actions/student.action";
import Link from "next/link";


export default async function StudentAll() {
  const courses = await getCourses();
  const propCourses = JSON.parse(JSON.stringify(courses));
  const students = await getStudents();
  
  // Barcha studentlarni sanash
  const totalStudents = students.length;
  let studentCounter = 1;
  return (
    <div>
      <article className="flex items-center justify-between mb-3">
        <h6 className="font-semibold text-[26px]">Bizning Talabalar</h6>
        <SearchFuture studentList={students} />
        <StudentForm propCourses={propCourses} />
      </article>
      <hr className="mb-7" />
      <div className="w-full">
        <article className="mb-5 flex gap-5 items-center">
          <p className="flex items-center gap-4"><span className="w-4 h-4 bg-white border inline-block"></span> Activ</p>
          <p className="flex items-center gap-4"><span className="w-4 h-4 bg-accent border inline-block"></span> Arxiv</p>
        </article>
        {totalStudents < 1 ? (
          <div className="w-full h-[80vh] flex gap-2 flex-col justify-center items-center">
            <UserX className="w-[50px] h-10 stroke-gray-500 stroke-[0.9px]" />
            <p className="text-center text-gray-500 text-lg">Studentlar topilmadi</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border">
                <th className="pl-2 font-semibold py-3">№</th>
                <th className="py-3 px-3">Ism - Familiya</th>
                <th className="py-3">Course</th>
                <th className="py-3">StudentID</th>
                <th className="py-3">Phone</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student: any, id: number) => (
                <tr key={student._id || id} className={`border hover:bg-gray-100 transition ${student.publishStudent ? "bg-white" : "bg-accent hover:bg-gray-400/20"}`}>
                  {student.publishStudent ? (
                    <>
                      <td className="py-2 text-[14px] font-medium px-3">{studentCounter++}</td>
                      <td className="py-2 text-[14px] font-normal px-3">
                        <Link href={`/dashboard/students/${student._id}`} className="hover:underline hover:text-orange-400 transition-all duration-300">
                          {student.name} {student.surname}
                        </Link>
                      </td>
                      <td className="py-2 text-[14px] font-normal">
                        {student.course.courseTitle}
                      </td>
                      <td className="py-2 text-[14px] font-normal">
                        <span className="py-1 px-2 rounded-full border bg-[#04b94f] text-white inline-flex">
                          {student.studentID}
                        </span>
                      </td>
                      <td className="py-2 text-[14px] font-normal">{student.phone}</td>
                      <td className="py-2">
                        <Action student={student} />
                      </td>
                    </>

                  ) : (
                    <>
                      <td className="py-2 text-[14px] font-medium px-3">{studentCounter++}</td>
                      <td className="py-2 text-[14px] font-normal px-3 text-gray-400">
                        <Link href={`/dashboard/students/${student._id}`} className="hover:underline hover:text-orange-400 transition-all duration-300">
                          {student.name} {student.surname}
                        </Link>
                      </td>
                      <td className="py-2 text-[14px] font-normal text-gray-400">
                        {student.course.courseTitle}
                      </td>
                      <td className="py-2 text-[14px] font-normal text-gray-400">
                        <span className="w-[109px] py-1 px-2 rounded-full border bg-[#b90404] text-white flex justify-center">
                          * * * * *
                        </span>
                      </td>
                      <td className="py-2 text-[14px] font-normal text-gray-400">{student.phone}</td>
                      <td className="py-2">
                        <Action student={student} />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

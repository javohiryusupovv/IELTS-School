import { getCourses } from "@/actions/course.action";
import StudentForm from "../_components/card/student-form";
import Action, { SearchFuture } from "./_components/action";
import { UserX } from "lucide-react";
import { getStudents } from "@/actions/student.action";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default async function StudentAll() {
  const courses = await getCourses();
  const propCourses = JSON.parse(JSON.stringify(courses));
  const students = await getStudents();

  const totalStudents = students.length;
  let studentCounter = 1;
  return (
    <div>
     <article className="items-center justify-between mb-3 max-sm:hidden sm:hidden OurMentor2:flex">
        <h6 className=" font-semibold lg:text-[26px] text-[23px]">Bizning Talabalar</h6>
        <div className=""><SearchFuture studentList={students} /></div>
        <div className=""><StudentForm propCourses={propCourses} /></div>
      </article>
      <article className="flex-col items-start justify-between w-full mb-10 sm:flex OurMentor2:hidden">
        <article className="flex justify-between w-full mb-5">
          <h6 className="font-semibold lg:text-[26px] text-[23px]">Bizning Talabalar</h6>
          <div className=""><StudentForm propCourses={propCourses} /></div>
        </article>
        <div className="w-full"><SearchFuture studentList={students} /></div>
      </article>

      <hr className="mb-7" />
      <div className="w-full">
        <article className="mb-5 flex gap-5 items-center">
          <p className="flex items-center gap-4">
            <span className="w-4 h-4 bg-green-500 inline-block"></span> Activ
          </p>
          <p className="flex items-center gap-4">
            <span className="w-4 h-4 bg-red-500 inline-block"></span> Arxiv
          </p>
        </article>
        {totalStudents < 1 ? (
          <div className="w-full h-[80vh] flex gap-2 flex-col justify-center items-center">
            <UserX className="w-[50px] h-10 stroke-gray-500 stroke-[0.9px]" />
            <p className="text-center text-gray-500 text-lg">
              Studentlar topilmadi
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto max-w-full scrollbar-orange">
            <table className="w-full text-left min-w-[600px] mb-[10px]">
              <thead>
                <tr className="border">
                  <th className="pl-2 font-semibold py-3 max-md:text-[12px] max-lg:text-[14px]">
                    №
                  </th>
                  <th className="py-3 px-3 max-md:text-[12px] max-lg:text-[14px]">
                    Ism - Familiya
                  </th>
                  <th className="py-3 max-md:text-[12px] max-lg:text-[14px]">
                    Course
                  </th>
                  <th className="py-3 max-md:text-[12px] max-lg:text-[14px]">
                    StudentID
                  </th>
                  <th className="py-3 max-md:text-[12px] max-lg:text-[14px]">
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student: any, id: number) => (
                  <tr
                    key={student._id || id}
                    className={`border hover:bg-gray-100 transition ${
                      student.publishStudent
                        ? "bg-white"
                        : "bg-accent hover:bg-gray-400/20"
                    }`}
                  >
                    {student.publishStudent ? (
                      <>
                        <td className="py-2 text-[14px] font-medium px-3">
                          {studentCounter++}
                        </td>
                        <td className="py-2 text-[14px] font-normal px-3 max-lg:text-[12px]">
                          <Link
                            href={`/dashboard/students/${student._id}`}
                            className="hover:underline hover:text-orange-400 transition-all duration-300"
                          >
                            {student.name} {student.surname}
                          </Link>
                        </td>
                        <td className="py-2 text-[14px] font-normal max-lg:text-[12px]">
                          {student.course.courseTitle}
                        </td>
                        <td className="py-2 text-[14px] font-normal max-lg:text-[11px] max-md:text-[9px]">
                          <span className="py-1 px-2 text-center rounded-full border bg-[#04b94f] text-white inline-flex">
                            {student.studentID}
                          </span>
                        </td>
                        <td className="py-2 text-[14px] font-normal max-lg:text-[12px]">
                          {student.phone}
                        </td>
                        <td className="py-2">
                          <Action student={student} />
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-2 text-[14px] font-medium px-3">
                          {studentCounter++}
                        </td>
                        <td className="py-2 text-[14px] font-normal px-3 text-gray-400">
                          <Link
                            href={`/dashboard/students/${student._id}`}
                            className="hover:underline hover:text-orange-400 transition-all duration-300"
                          >
                            {student.name} {student.surname}
                          </Link>
                        </td>
                        <td className="py-2 text-[14px] font-normal text-gray-400">
                          {student.course.courseTitle}
                        </td>
                        <td className="py-2 text-[14px] font-normal text-gray-400 max-lg:text-[11px] max-md:text-[9px]">
                          <span className="w-[100px] py-1 px-1 text-center rounded-full border bg-[#b90404] text-white flex justify-center">
                            * * * * *
                          </span>
                        </td>
                        <td className="py-2 text-[14px] font-normal text-gray-400">
                          {student.phone}
                        </td>
                        <td className="py-2">
                          <Action student={student} />
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="strelka:hidden">
              <div className=" flex items-center justify-between absolute left-[250px]">
                <FaArrowLeft size={12} color="orange" />
              </div>
              <div className=" flex items-center justify-between absolute right-[28px]">
                <FaArrowRight size={12} color="orange" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

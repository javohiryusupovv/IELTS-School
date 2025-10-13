"use client";

import { ICourse, IStudent } from "@/types/type";
import { useMemo, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Action from "./action";
import { CircleX } from "lucide-react";
import PayModal from "./PayModal";

interface PropsTableStudent {
  students: IStudent[];
  courses: ICourse[];
  educationID: string,
}

export default function TableStudent({ students, courses, educationID }: PropsTableStudent) {
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [selectedTeacher, setSelectedTeacher] = useState<string>("all");

  // 🔹 Unique teacherlar listini chiqarish
  const teachers = useMemo(() => {
    const unique: { id: string; name: string }[] = [];
    courses.forEach((course) => {
      const teacher = course.teacher;
      if (teacher && typeof teacher === "object" && teacher._id) {
        if (!unique.some((t) => t.id === teacher._id)) {
          unique.push({
            id: teacher._id,
            name: `${teacher.teacherName} ${teacher.teacherSurname}`,
          });
        }
      }
    });
    return unique;
  }, [courses]);

  // 🔹 Filterlangan students
  const filteredStudents = students.filter((student) => {
    const byCourse =
      selectedCourse === "all" || student.course?._id === selectedCourse;

    const teacher = student.course?.teacher;
    const teacherId = typeof teacher === "string" ? teacher : teacher?._id;

    const byTeacher =
      selectedTeacher === "all" || teacherId === selectedTeacher;

    return byCourse && byTeacher;
  });

  let studentCounter = 1;

  return (
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
            <th>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="group relative w-[170px] h-[35px] font-normal">
                  <SelectValue placeholder="Kursni tanlang" />
                  {selectedCourse !== "all" && (
                    <CircleX
                      className="absolute right-3 top-2 z-30 bg-white cursor-pointer text-gray-500 hover:text-red-500 transition"
                      size={18}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedCourse("all");
                      }}
                    />
                  )}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barchasi</SelectItem>
                  {courses.map((course: ICourse) => (
                    <SelectItem
                      key={course._id}
                      value={course._id}
                      className="max-sm:text-[14px] transition-all duration-200 line-clamp-1"
                    >
                      {course.courseTitle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </th>
            <th>
              <Select
                value={selectedTeacher}
                onValueChange={setSelectedTeacher}
              >
                <SelectTrigger className="group relative w-[170px] h-[35px] font-normal">
                  <SelectValue placeholder="O‘qituvchini tanlang" />
                  {selectedTeacher !== "all" && (
                    <CircleX
                      className="absolute right-3 top-2 z-30 bg-white cursor-pointer text-gray-500 hover:text-red-500 transition"
                      size={18}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedTeacher("all");
                      }}
                    />
                  )}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barchasi</SelectItem>
                  {teachers.map((t) => (
                    <SelectItem
                      key={t.id}
                      value={t.id}
                      className="max-sm:text-[14px] line-clamp-1"
                    >
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </th>
            <th className="py-3 max-md:text-[12px] max-lg:text-[14px]">
              TalabaID
            </th>
            <th className="py-3 max-md:text-[12px] max-lg:text-[14px]">
              Telefon
            </th>
            <th className="py-3 max-md:text-[12px] max-lg:text-[14px]">
              Tulov statusi
            </th>
            <th className="py-3 max-md:text-[12px] max-lg:text-[14px]">
              O'chirish
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student: any, id: number) => (
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
                    {student.course?.courseTitle}
                  </td>
                  <td className="py-2 text-[14px] font-normal max-lg:text-[12px]">
                    {typeof student.course?.teacher === "object"
                      ? `${student.course.teacher.teacherName} ${student.course.teacher.teacherSurname}`
                      : ""}
                  </td>
                  <td className="py-2 text-[14px] font-normal max-lg:text-[11px] max-md:text-[9px]">
                    <span className="py-1 px-2 text-center rounded-full border bg-[#04b94f] text-white inline-flex">
                      {student.studentID}
                    </span>
                  </td>
                  <td className="py-2 text-[14px] font-normal max-lg:text-[12px]">
                    +998 {student.phone}
                  </td>
                  <td className="py-2 text-[14px] font-normal max-lg:text-[12px]">
                    {(() => {
                      const balance = student.balance || 0;

                      if (balance < 0) {
                        return (
                          <article className="flex items-center gap-2">
                            <span className="py-1 px-5 border rounded-full bg-red-500 text-white inline-flex">
                              Qarzdor
                            </span>
                            <PayModal student={student} />
                          </article>
                        );
                      }

                      return (
                        <p className="py-1 px-5 border rounded-full bg-green-500 text-white inline-flex">
                          To‘langan
                        </p>
                      );
                    })()}
                  </td>
                  <td className="py-2">
                    <Action student={student} educationID={educationID} />
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
                  <td className="py-2 text-[14px] font-normal text-gray-400">
                    {typeof student.course?.teacher === "object"
                      ? `${student.course.teacher.teacherName} ${student.course.teacher.teacherSurname}`
                      : ""}
                  </td>
                  <td className="py-2 text-[14px] font-normal text-gray-400 max-lg:text-[11px] max-md:text-[9px]">
                    <span className="w-[100px] py-1 px-1 text-center rounded-full border bg-[#b90404] text-white flex justify-center">
                      * * * * *
                    </span>
                  </td>
                  <td className="py-2 text-[14px] font-normal text-gray-400">
                    +998 {student.phone}
                  </td>
                  <td>
                    <article className="flex items-center gap-2">
                      <span className="py-1 px-5 border rounded-full bg-gray-400 text-white inline-flex">
                        Arxiv
                      </span>
                    </article>
                  </td>
                  <td className="py-2">
                    <Action student={student} educationID={educationID}/>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

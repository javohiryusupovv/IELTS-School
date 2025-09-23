"use client";

import { ICourse, IStudent } from "@/types/type";
import { useState } from "react";

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
}

export default function TableStudent({ students, courses }: PropsTableStudent) {
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  const filteredStudents =
    selectedCourse === "all"
      ? students
      : students.filter(
        (student) => student.course && student.course._id === selectedCourse
      );

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
                        e.preventDefault()
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
              className={`border hover:bg-gray-100 transition ${student.publishStudent
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
                      // So‘nggi paymentni olish
                      const lastPayment = student.payments?.[student.payments.length - 1];

                      if (lastPayment) {
                        if (lastPayment.status === "paid") {
                          // To‘liq to‘langan bo‘lsa
                          return (
                            <p className="py-1 px-5 border rounded-full bg-green-500 text-white inline-flex">
                              Paid
                            </p>
                          );
                        } else if (lastPayment.status === "debt") {
                          // Qarzdor bo‘lsa
                          return (
                            <article className="flex items-center gap-2">
                              <span className="py-1 px-5 border rounded-full bg-red-500 text-white inline-flex">
                                Debt
                              </span>
                              <PayModal student={student} />
                            </article>
                          );
                        }
                      }

                      // Agar umuman payment bo‘lmasa ham qarzdor chiqsin
                      return (
                        <article className="flex items-center gap-2">
                          <span className="py-1 px-5 border rounded-full bg-red-500 text-white inline-flex">
                            Debt
                          </span>
                          <PayModal student={student} />
                        </article>
                      );
                    })()}

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
                    +998 {student.phone}
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
    </div>
  );
}

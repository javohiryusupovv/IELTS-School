"use client";

import { addAttendance } from "@/actions/student.action";
import "./attendence.css";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";
import { ChevronRight, ChevronLeft, User, Check, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { usePathname } from "next/navigation";
import { formatDate } from "../../../../../constants/page";
import { ICourse } from "@/types/type";
import EctraCoin from "../extra/extracoin";

interface Props {
  students: any;
  days: string[];
  titleCourse: string;
  teacherName: string;
  course: ICourse;
  roleTeacher: string;
}

export default function Attendence({
  course,
  students,
  days,
  titleCourse,
  teacherName,
  roleTeacher,
}: Props) {
  const [selectedCell, setSelectedCell] = useState<{
    studentID: string;
    day: string;
  } | null>(null);

  const pathname = usePathname();

  // Hozirgi oy va yil
  const [currentMonth, setCurrentMonth] = useState(moment(days[0]).month());
  const [currentYears, setCurrentYears] = useState(moment(days[0]).year());

  const [attendance, setAttendance] = useState<{
    [studentId: string]: { [day: string]: "keldi" | "kelmadi" | "bosh" };
  }>(() => {
    const initial: {
      [studentId: string]: { [day: string]: "keldi" | "kelmadi" | "bosh" };
    } = {};
    students.forEach((student: any) => {
      initial[student._id] = {};
      student.attendance?.forEach((att: any) => {
        initial[student._id][att.date] = att.status as
          | "keldi"
          | "kelmadi"
          | "bosh";
      });
    });
    return initial;
  });

  const handleAttendance = async (
    studentId: string,
    day: string,
    status: "keldi" | "kelmadi" | "bosh"
  ) => {
    try {
      await addAttendance(studentId, day, status, pathname); // DB update
      setAttendance((prev) => ({
        ...prev,
        [studentId]: { ...prev[studentId], [day]: status },
      }));
    } catch (error: any) {
      toast.error(error.message || "Xatolik yuz berdi");
    }
  };

  const filterDays = days.filter(
    (day) =>
      moment(day).month() === currentMonth &&
      moment(day).year() === currentYears
  );

  const nextMonth = () => {
    const nextDate = moment()
      .year(currentYears)
      .month(currentMonth)
      .add(1, "month");
    if (
      days.some(
        (day) =>
          moment(day).month() === nextDate.month() &&
          moment(day).year() === nextDate.year()
      )
    ) {
      setCurrentMonth(nextDate.month());
      setCurrentYears(nextDate.year());
    }
  };

  const prevMonth = () => {
    const prevDate = moment()
      .year(currentYears)
      .month(currentMonth)
      .subtract(1, "month");
    if (
      days.some(
        (day) =>
          moment(day).month() === prevDate.month() &&
          moment(day).year() === prevDate.year()
      )
    ) {
      setCurrentMonth(prevDate.month());
      setCurrentYears(prevDate.year());
    }
  };

  // const handleSelect = (studentID: string, day: string) => {
  //   setSelectedCell((prev) => {
  //     if (prev?.studentID === studentID && prev?.day === day) return null;
  //     return { studentID, day };
  //   });
  // };

  return (
    <div className="p-4 ">
      <div className="flex w-full flex-col relative">
        <article className="flex items-center gap-3 mb-7 max-sm:mt-[50px]">
          <p className="w-[6] h-[6] rounded-full bg-orange-400"></p>
          <h6 className="flex gap-3 items-center md:text-[25px] text-lg">
            {titleCourse}
            <p className="w-[6] h-[6] rounded-full bg-orange-400"></p>
            {teacherName}
          </h6>
        </article>
        <div className="flex items-center justify-end mr-10 gap-4 mb-5 max-btn:absolute sm:-bottom-[365px] -bottom-[380px] -right-10">
          <button
            onClick={prevMonth}
            className="flex items-center py-[2px] px-2 border rounded-sm focus:bg-orange-500 bg-[#ffa600b8]"
          >
            <ChevronLeft className="stroke-white stroke-1 w-[18] h-[18px]" />
          </button>
          <p>
            {moment()
              .month(currentMonth)
              .format("MMMM")
              .slice(0, 3)
              .toLowerCase()}{" "}
            {currentYears}
          </p>
          <button
            onClick={nextMonth}
            className="flex items-center py-[2px] px-2 border rounded-md focus:bg-orange-500 bg-[#ffa600b8]"
          >
            <ChevronRight className="stroke-white stroke-1 w-[18] h-[18px]" />
          </button>
        </div>
      </div>

      <div className="grid btn:grid-cols-4 sm:grid-cols-3 grid-cols-1 justify-between items-start sm:gap-10 mb-5">
        <div className="max-btn:w-[400px] max-sm:w-full border px-5 pt-5 pb-16 col-span-1 rounded shadow-md shadow-gray-500/10 mb-16">
          <article>
            <p className="flex gap-3 items-center text-[14px]">
              <strong className="font-medium text-[13px]">Kurs: </strong>{" "}
              {course.courseTitle}
            </p>
          </article>
          <article className="flex gap-3 items-center text-[14px]">
            <p>
              <strong className="font-medium text-[13px]">O'qituvchi: </strong>{" "}
              {teacherName}
            </p>
          </article>
          <article>
            <p>
              <strong className="font-medium text-[13px]">Role: </strong>{" "}
              {roleTeacher}
            </p>
          </article>
          <article className="flex gap-3 items-center text-[14px]">
            <p>
              <strong className="font-medium text-[13px]">
                O'quvchilar soni:{" "}
              </strong>{" "}
              {students.length} ta
            </p>
          </article>
          <article className="text-[14px]">
            <p>
              <strong className="font-medium text-[13px]">
                Dars muddati:{" "}
              </strong>
            </p>
            <p>
              {formatDate(course.startDate)} — {formatDate(course.endDate)}
            </p>
          </article>
          <article className="mt-14">
            <EctraCoin students={students} />
          </article>
        </div>

        <div className="col-span-3 xl:w-full overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full pr-28">
              <thead className="overflow-x-auto w-full whitespace-nowrap border-t border-b mr-[100px]">
                <tr className="text-left whitespace-nowrap">
                  <th className="w-[150px] bg-white sticky left-0 z-[10]">
                    <p className="text-[15px] font-medium py-2">Ism</p>
                  </th>
                  {filterDays.map((day, i) => (
                    <th key={i} className="text-center text-[12px] p-3">
                      {moment(day).format("D-MMM")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((student: any, id: number) => (
                  <tr key={id} className="border-b-[0.3px]">
                    <th className="w-[200px] sticky left-0 z-[10] bg-white">
                      <div className="flex items-center gap-2 md:w-[200px] max-w-max pr-5 text-left py-3">
                        <User className="stroke-1" />
                        <p className="text-[14px] overflow-hidden whitespace-nowrap text-ellipsis font-normal">
                          {student.surname} {student.name}
                        </p>
                      </div>
                    </th>
                    {filterDays.map((day, i) => {
                      return (
                        <td key={i} className="text-[12px] p-3">
                          <span className="text-white flex items-center justify-center">
                            <Popover>
                              <PopoverTrigger asChild>
                                <button
                                  title={
                                    attendance[student._id]?.[day] === "keldi"
                                      ? "Keldi"
                                      : attendance[student._id]?.[day] ===
                                        "kelmadi"
                                      ? "Kelmadi"
                                      : "Bo'sh"
                                  }
                                  className={`w-8 h-8 border rounded-full flex items-center justify-center transition-all duration-300
                                    ${
                                      attendance[student._id]?.[day] === "keldi"
                                        ? "bg-green-400/10 border-transparent"
                                        : attendance[student._id]?.[day] === "kelmadi"
                                        ? "bg-red-400/10 border-transparent"
                                        : "border-gray-300/60"
                                    }
                                  `}
                                >
                                  {attendance[student._id]?.[day] ===
                                    "keldi" && (
                                    <Check className="text-green-500 w-4 h-4" />
                                  )}
                                  {attendance[student._id]?.[day] ===
                                    "kelmadi" && (
                                    <X className="text-red-500 w-4 h-4" />
                                  )}
                                  {attendance[student._id]?.[day] ===
                                    "bosh" && (
                                    <span className="text-gray-500"></span>
                                  )}
                                </button>
                              </PopoverTrigger>

                              <PopoverContent className="w-[150px] px-2 py-1 rounded-lg flex items-center justify-between">
                                <button
                                  title="Keldi"
                                  onClick={() =>
                                    handleAttendance(student._id, day, "keldi")
                                  }
                                  className="border p-[5px] rounded-full hover:bg-green-400/20 border-green-400/20"
                                >
                                  <Check className="text-green-500 w-5 h-5" />
                                </button>

                                <button
                                  title="Bo'sh"
                                  onClick={() =>
                                    handleAttendance(student._id, day, "bosh")
                                  }
                                  className="border w-8 h-8 rounded-full hover:bg-gray-400/20 border-gray-400/20"
                                >
                                  –
                                </button>

                                <button
                                  title="Kelmadi"
                                  onClick={() =>
                                    handleAttendance(
                                      student._id,
                                      day,
                                      "kelmadi"
                                    )
                                  }
                                  className="border p-[5px] rounded-full hover:bg-red-400/20 border-red-400/20"
                                >
                                  <X className="text-red-500 w-5 h-5" />
                                </button>
                              </PopoverContent>
                            </Popover>
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

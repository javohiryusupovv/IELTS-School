"use client";

import { addCoins } from "@/actions/student.action";
import "./attendence.css";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";
import {
  ChevronRight,
  ChevronLeft,
  LockKeyhole,
  CheckCheck,
  Info,
  User,
  Check,
  X,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { usePathname } from "next/navigation";
import { formatDate, reasonsWithValues } from "../../../../../constants/page";
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

  const handleSelect = (studentID: string, day: string) => {
    setSelectedCell((prev) => {
      if (prev?.studentID === studentID && prev?.day === day) return null;
      return { studentID, day };
    });
  };

  const handleCheckedValue = async (reason: string) => {
    const studentId = selectedCell?.studentID;
    if (!studentId) return;

    const filteredReasonsArray = [
      {
        reason,
        value: reasonsWithValues[reason as keyof typeof reasonsWithValues],
      },
    ];

    try {
      toast.promise(
        addCoins(studentId, filteredReasonsArray, pathname, selectedCell?.day),
        {
          loading: "Qo'shilmoqda...",
          success: {
            message: "Coin muvaffaqiyatli qo'shildi",
            duration: 2500,
            style: {
              height: "50px",
              color: "orange",
              border: "1px solid orange",
              backgroundColor: "white",
            },
          },
          error: "Xatolik yuz berdi",
        }
      );
      setSelectedCell(null);
    } catch (error) {
      console.log("Xatolik:", error);
    }
  };

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
            {moment().month(currentMonth).format("MMMM").slice(0, 3).toLowerCase()}{" "}
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
              <strong className="font-medium text-[13px]">Dars muddati: </strong>
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
                              <PopoverTrigger
                                asChild
                                onClick={() => handleSelect(student._id, day)}
                              >
                                <button className="w-8 h-8 border rounded-full cursor-pointer hover:border-green-500 transition-all duration-300"></button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[100px] px-2 py-1 rounded-full flex items-center justify-between">
                                <button
                                  onClick={() => handleCheckedValue("VaqtidaKeldi")}
                                  title="Keldi"
                                  className="border p-[5px] rounded-full hover:bg-green-400/20 border-green-400/20 transition-all duration-200 text-white text-sm flex items-center gap-1"
                                >
                                  <Check className="text-green-500 w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleCheckedValue("Kelmagan")}
                                  title="Kelmadi"
                                  className="border p-[5px] rounded-full hover:bg-red-400/20 border-red-400/20 transition-all duration-200 text-white text-sm flex items-center gap-1"
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

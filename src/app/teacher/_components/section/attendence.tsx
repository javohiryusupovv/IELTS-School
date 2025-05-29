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
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";

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
  const [isopen, setOpen] = useState(false);
  const [attedence, setAttendence] = useState({
    homework: false,
    keldi: false,
    leader: false,
  });
  const pathname = usePathname();

  const handleOnChangeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setAttendence((item) => ({
      ...item,
      [id]: checked,
    }));
  };

  // Hozirgi oy va yilni boshlang'ich qiymati
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
    setOpen(!isopen);
  };

  const handleCheckedValue = async () => {
    const studentId = selectedCell?.studentID;
    if (!studentId) return;

    // Checkboxlarning qiymatlari
    const reasons = {
      UygaVazifa: attedence.homework,
      VaqtidaKeldi: attedence.keldi,
      ImtihondanYaxshiBall: attedence.leader,
    };
    // Tanlangan sabablarga ko'ra qiymatlarni olish
    const filteredReasons = Object.entries(reasons);
    const filteredReasonsArray = filteredReasons
      .filter(([key, value]) => value === true)
      .map(([key]) => ({
        reason: key,
        value: reasonsWithValues[key as keyof typeof reasonsWithValues],
      }));

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
          error: "Coin sabablari tanlanmadi",
        }
      );
      setAttendence({
        homework: false,
        keldi: false,
        leader: false,
      });
      setSelectedCell(null);
    } catch (error) {
      console.log("Xatolik:", error);
      throw new Error("Xatolik yuz berdi");
    }
  };

  return (
    <div className="p-4">
      <div className="flex w-full flex-col relative">
        <article className="flex items-center gap-3 mb-7">
          <p className="w-[6] h-[6] rounded-full bg-orange-400"></p>
          <h6 className="flex gap-3 items-center md:text-[25px] text-lg">
            {titleCourse}
            <p className="w-[6] h-[6] rounded-full bg-orange-400"></p>
            {teacherName}
          </h6>
        </article>
        <div className="flex items-center justify-end mr-10 gap-4 mb-5 max-btn:absolute -bottom-[365px] -right-10">
          <button
            onClick={prevMonth}
            className="flex items-center py-[2px] px-2 border rounded-sm  focus:bg-orange-500 bg-[#ffa600b8]"
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
      <div className="grid btn:grid-cols-4 grid-cols-3 justify-between items-start gap-10 mb-5">
        <div className="max-btn:w-[400px] max-sm:w-[300px] max-teacher:w-[250px] border px-5 pt-5 pb-16 col-span-1 rounded shadow-md shadow-gray-500/10">
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
        <div className="col-span-3  xl:w-full overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full pr-28">
              <thead className="overflow-x-auto w-full whitespace-nowrap border-t border-b mr-[100px]">
                <tr className="text-left whitespace-nowrap">
                  <th className="w-[150px] bg-white sticky left-0 z-[10]">
                    <p className="text-[15px] font-medium py-2">Ism</p>
                  </th>
                  {filterDays.map((month, i) => (
                    <th key={i} className="text-center text-[12px] p-3">
                      {moment(month).format("D-MMM")}
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
                      const today = moment().format("YYYY-MM-DD");
                      const isArxivDay = moment(day).isSameOrBefore(
                        today,
                        "day"
                      );
                      const isToday = moment(day).isSame(today, "day");
                      const isCoinGiven = student.coins?.some((coin: any) =>
                        moment(coin.date).isSame(day, "day")
                      );

                      return (
                        <td key={i} className="text-[12px] p-3">
                          <span className="text-white flex items-center justify-center">
                            {isArxivDay ? (
                              isToday ? (
                                isCoinGiven ? (
                                  // Bugungi kun va coin berilgan holat
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger
                                        disabled
                                        className="cursor-pointer flex justify-center items-center py-1 px-2 rounded-md bg-[#f0f9f3]"
                                      >
                                        <CheckCheck className="stroke-green-500 stroke-[1.4] w-4 h-5" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="text-green-500">
                                          Coin berilgan
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                ) : (
                                  // Bugungi kun va coin berilmagan holat
                                  <Popover>
                                    <PopoverTrigger
                                      asChild
                                      onClick={() =>
                                        handleSelect(student._id, day)
                                      }
                                    >
                                      <button className="w-9 h-7 cursor-pointer border rounded-md hover:border-green-500 transition-all duration-300"></button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-64">
                                      <div>
                                        <p className="text-orange-500 text-center mb-2">
                                          Coin sabablari
                                        </p>
                                        <hr className="mb-2" />
                                        <article className="flex items-center gap-2 mb-2">
                                          <input
                                            type="checkbox"
                                            checked={attedence.homework}
                                            onChange={handleOnChangeChecked}
                                            id="homework"
                                            name="attendance"
                                          />
                                          -
                                          <label
                                            htmlFor="homework"
                                            className="text-[13px]"
                                          >
                                            Uyga vazifa
                                          </label>
                                        </article>
                                        <article className="flex items-center gap-2 mb-4">
                                          <input
                                            type="checkbox"
                                            checked={attedence.keldi}
                                            onChange={handleOnChangeChecked}
                                            id="keldi"
                                            name="attendance"
                                          />
                                          -
                                          <label
                                            htmlFor="keldi"
                                            className="text-[13px]"
                                          >
                                            Vaqtida keldi
                                          </label>
                                        </article>
                                        <PopoverClose
                                          onClick={handleCheckedValue}
                                          className="px-2 py-1 text-[13px] rounded-md bg-orange-500 text-white"
                                        >
                                          Saqlash
                                        </PopoverClose>
                                      </div>
                                    </PopoverContent>
                                  </Popover>
                                )
                              ) : (
                                // Arxiv kuni lekin bugun emas
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger
                                      disabled
                                      className={`cursor-pointer flex justify-center items-center py-1 px-2 rounded ${
                                        isCoinGiven
                                          ? "bg-[#f0f9f3]"
                                          : "bg-[#ff000013]"
                                      }`}
                                    >
                                      {isCoinGiven ? (
                                        <CheckCheck className="stroke-green-500 stroke-[1.4] w-5 h-5" />
                                      ) : (
                                        <Info className="stroke-red-500 stroke-1 w-4 h-5" />
                                      )}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p
                                        className={
                                          isCoinGiven
                                            ? "text-green-500"
                                            : "text-red-500"
                                        }
                                      >
                                        {isCoinGiven
                                          ? "Coin berilgan"
                                          : "Coin berilmagan"}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )
                            ) : (
                              // Kelajakdagi kun — yopiq
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger
                                    disabled
                                    className="cursor-not-allowed py-1 px-3 border rounded-md"
                                  >
                                    <LockKeyhole className="stroke-black/70 stroke-1 w-4 h-5" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Yopiq kun</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
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

"use client";

import { postCourse } from "@/actions/course.action";
import { getTeachers } from "@/actions/teacher.action";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ITeacher } from "@/types/type";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Datapicker } from "../_components/startDay/datapicker";
import { DatapickerEnd } from "../_components/endDay/dataPicker";
import OddEvenDayFilter from "../_components/selectDay/odd.even";
import { CalendarDayGet } from "@/components/custom/CalendarDayGet";
import { CourseSchemaZod } from "@/actions/zod";
import { Plus } from "lucide-react";

function CreateCourse() {
  const [courseTitle, setCourseTitle] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectDay, setSelectDay] = useState("toq");
  const [iserror, setError] = useState<string[]>([]);

  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const data = await getTeachers();
        setTeachers(data);
      } catch (error) {
        console.error("O'qituvchilarni olishda xatolik:", error);
      }
    };

    fetchTeacher();
  }, []);

  let courseDays = CalendarDayGet(startDate, endDate);
  let filteredDay = courseDays.filter((day) => {
    let dayNumber = new Date(day).getDate();
    return selectDay === "juft" ? dayNumber % 2 === 0 : dayNumber % 2 !== 0;
  });
  const handleSelectDay = (dayType: string) => {
    setSelectDay(dayType);
  };

  const totalValue = async (e: React.MouseEvent) => {
    e.preventDefault();
    const CourseValidation = CourseSchemaZod.safeParse({
      title: courseTitle,
    });

    if (!CourseValidation.success) {
      const errorMessage = CourseValidation.error.errors.map(
        (err) => err.message
      );
      setError(errorMessage);
      return;
    }
    const { title } = CourseValidation.data;
    try {
      const course = postCourse(
        title,
        teacherId,
        startDate ? startDate.toISOString() : "",
        endDate ? endDate.toISOString() : "",
        filteredDay,
        pathname
      );
      toast.promise(course, {
        loading: "Loading...",
        success: {
          message: "Kurs Yaratildi",
          duration: 2500,
          style: {
            height: "50px", // fon yashil bo'ladi
            color: "green",
            border: "1px solid #17be5a",
            backgroundColor: "white",
          },
        },
        error: "Kurs Yaratishda Xatolik",
      });
      setCourseTitle("");
      setTeacherId("");
      setStartDate(null);
      setEndDate(null);
      setSelectDay("");
      setOpen(false);
      await course;
    } catch (error) {
      console.log("Sizdagi karobkalar xatolikka uchradi", error);
    }
  };

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="md:px-5 md:py-3 px-2 py-[6px] rounded-md md:rounded-full bg-[#f18024] hover:bg-[#f18024ca] transition-all duration-200">
            <p className="text-[12px] font-medium text-white max-md:hidden">
              Yangi Kurs qushish
            </p>
            <Plus className="text-white w-4 h-4 md:hidden" />
          </button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="mb-5 max-sm:space-y-0">
            <SheetTitle className="text-[20px] max-sm:text-[17px]">
              Yangi Kurs Yaratish
            </SheetTitle>
            <SheetDescription className="max-sm:text-[12px] text-[15px]">
              Kurs yaratish uchun to&apos;ldirib chiqing !
            </SheetDescription>
          </SheetHeader>
          <div className="w-full mb-5">
            <label
              className="flex gap-2 text-[#d47323cd] max-sm:text-[14px] flex-col sm:mb-5 mb-3"
              htmlFor="kurs"
            >
              Kurs nomi
              <input
                onChange={(e) => {
                  setCourseTitle(e.target.value);
                  setError((err) => {
                    const newErrors = [...err];
                    newErrors[0] = "";
                    return newErrors;
                  });
                }}
                value={courseTitle}
                className={`py-2 border rounded-md px-2 text-gray-700 transition-all duration-200 ${
                  iserror[0]
                    ? "border-red-600 border-[1.5px]"
                    : "border-gray-300"
                }`}
                id="kurs"
                type="text"
                placeholder="Kurs nomini kiriting !"
              />
              <span className="text-[12px] font-light text-red-600">
                {iserror[0]}
              </span>
            </label>
            <div className="sm:flex max-sm:flex-col w-full gap-1 items-center justify-between mb-5">
              <div className="max-sm:mb-4">
                <p className="sm:text-[15px] text-[14px] sm:mb-2 mb-1 text-[#d47323cd]">
                  Boshlanish kuni*
                </p>
                <Datapicker startDate={startDate} setStartDate={setStartDate} />
              </div>
              <div>
                <p className="sm:text-[15px] text-[14px] sm:mb-2 mb-1 text-[#d47323cd]">
                  Tugash kuni*
                </p>
                <DatapickerEnd endDate={endDate} setEndDate={setEndDate} />
              </div>
            </div>
            <OddEvenDayFilter
              selectDay={selectDay}
              filterDay={handleSelectDay}
            />
            <label
              className="flex gap-2 text-[#d47323cd] max-sm:text-[14px] flex-col mb-5"
              htmlFor="kurs"
            >
              Teacherni tanlang*
              <select
                className="w-full py-2 rounded-md border"
                onChange={(e) => setTeacherId(e.target.value)}
                value={teacherId}
              >
                <option value="">Tanlang ...</option>
                {teachers.map((teach: ITeacher) => (
                  <option
                    key={teach._id}
                    value={teach._id}
                    className="max-sm:text-[15px]"
                  >
                    {teach.teacherName} {teach.teacherSurname}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <button
                onClick={totalValue}
                type="submit"
                className="sm:px-5 sm:py-2 px-3 py-1.5 rounded-full bg-[#f18024] hover:bg-[#f18024ca] transition-all duration-200"
              >
                <p className="sm:text-[15px] text-[13px] font-medium text-white">
                  Saqlash
                </p>
              </button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default CreateCourse;

"use client";

import { updateCourseServer } from "@/actions/course.action";
import { DatapickerEnd } from "@/app/dashboard/_components/endDay/dataPicker";
import OddEvenDayFilter from "@/app/dashboard/_components/selectDay/odd.even";
import { Datapicker } from "@/app/dashboard/_components/startDay/datapicker";
import { CalendarDayGet } from "@/components/custom/CalendarDayGet";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ICourse } from "@/types/type";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { IUpdateCourse } from "../../../../../../app.types";

interface Props {
  course: ICourse;
}

export default function EditCourse({ course }: Props) {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(
    course.startDate ? new Date(course.startDate) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    course.endDate ? new Date(course.endDate) : null
  );
  const [selectDay, setSelectDay] = useState("toq");
  const pathname = usePathname();

  useEffect(() => {
    if (course.days && course.days.length > 0) {
      const firstDay = new Date(course.days[0]).getDate();
      const detectedDayType = firstDay % 2 === 0 ? "juft" : "toq";
      setSelectDay(detectedDayType);
    }
  }, [course.days]);

  const totalValue = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const updatedCourse: IUpdateCourse = {
        _id: course._id,
        courseTitle: formData.get("title") as string,
        startDate: startDate ? startDate.toISOString() : course.startDate,
        endDate: endDate ? endDate.toISOString() : course.endDate,
        days: filteredDay,
        teacher: typeof course.teacher === "object" ? course.teacher._id : "",
      };

      const updatePromise = updateCourseServer(
        course._id,
        updatedCourse,
        pathname
      );

      toast.promise(updatePromise, {
        loading: "Yuklanmoqda...",
        success: {
          message: "Kurs yangilandi!",
          duration: 2500,
          style: {
            height: "50px", // fon yashil bo'ladi
            color: "green",
            border: "1px solid #17be5a",
            backgroundColor: "white",
          },
        },
        error: "Kursni yangilashda xatolik!",
      });

      await updatePromise;
    } catch (error) {
      console.log(error);
    }
  };

  const filteredDay = useMemo(() => {
    let courseDays = CalendarDayGet(startDate, endDate);
    return courseDays.filter((day) => {
      let dayNumber = new Date(day).getDate();
      return selectDay === "juft" ? dayNumber % 2 === 0 : dayNumber % 2 !== 0;
    });
  }, [startDate, endDate, selectDay]);
  const handleSelectDay = (dayType: string) => {
    setSelectDay(dayType);
  };

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="px-5 py-3 rounded-full bg-[#f18024] hover:bg-[#f18024ca] transition-all duration-200">
            <p className="text-[12px] font-medium text-white">
              Kursni tahrirlash
            </p>
          </button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="mb-5">
            <SheetTitle>Kurs ma'lumotlarini tahrirlash</SheetTitle>
            <SheetDescription>
              Kurs ma'lumotlarini tahrirlash uchun qayta to'ldiring!
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={totalValue} className="w-full mb-5">
            <label
              className="flex gap-2 text-[#d47323cd] flex-col mb-5"
              htmlFor="kurs"
            >
              Kurs nomi
              <input
                defaultValue={course.courseTitle}
                name="title"
                className="py-2 border rounded-md px-2 text-gray-700 "
                id="kurs"
                type="text"
                placeholder="Kurs nomini kiriting !"
              />
            </label>
            <div className="flex w-full justify-between mb-5">
              <div>
                <p className="text-[15px] mb-2 text-[#d47323cd]">
                  Boshlanish kuni*
                </p>
                <Datapicker startDate={startDate} setStartDate={setStartDate} />
              </div>
              <div>
                <p className="text-[15px] mb-2 text-[#d47323cd]">
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
              className="flex gap-2 text-[#d47323cd] flex-col mb-10"
              htmlFor="kurs"
            >
              Teacherni tanlang*
              <p className="relative top-0 left-0 group py-2 px-3 rounded-md bg-gray-100 cursor-not-allowed">
                {typeof course.teacher === "object"
                  ? `${course.teacher.teacherName} ${course.teacher.teacherSurname}`
                  : null}
                <span className="opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 absolute left-0 -bottom-5 px-2 bg-red-500 text-white rounded text-[12px]">
                  O'qituvchini o'zgartirish mumkin emas !
                </span>
              </p>
            </label>
            <SheetClose asChild>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-[#f18024] hover:bg-[#f18024ca] transition-all duration-200"
              >
                <p className="text-[15px] font-medium text-white">Yangilash</p>
              </button>
            </SheetClose>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICourse, ITeacher } from "@/types/type";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { IUpdateCourse } from "../../../../../../app.types";
import { FaEdit } from "react-icons/fa";

interface Props {
  course: ICourse;
  teachers: ITeacher[]; // ✅ Barcha teacherlar kelishi kerak
}

export default function EditCourse({ course, teachers }: Props) {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(
    course.startDate ? new Date(course.startDate) : null
  );

  const [endDate, setEndDate] = useState<Date | null>(
    course.endDate ? new Date(course.endDate) : null
  );
  const [selectDay, setSelectDay] = useState("juft");
  const [teacher, setTeacher] = useState(
    typeof course.teacher === "object" ? course.teacher._id : course.teacher
  );
  

  

  const pathname = usePathname();

  useEffect(() => {
    if (course.days && course.days.length > 0) {
      const firstDay = new Date(course.days[0]).getDay();
      const detectedDayType = [2, 4, 6].includes(firstDay) ? "juft" : "toq";
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
        teacher: teacher, // ✅ Selectdan kelgan teacher
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
            height: "50px",
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
      let weekday = new Date(day).getDay();
      if (weekday === 0) return false;
      return selectDay === "juft"
        ? [2, 4, 6].includes(weekday)
        : [1, 3, 5].includes(weekday);
    });
  }, [startDate, endDate, selectDay]);

  const handleSelectDay = (dayType: string) => {
    setSelectDay(dayType);
  };

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className=" absolute top-0 right-0 z-[40] px-5 py-3 rounded-full bg-[#f18024] hover:bg-[#f18024ca] transition-all duration-200 max-lg:px-3">
            <p className="text-[12px] font-medium text-white max-lg:hidden">
              Kursni tahrirlash
            </p>
            <FaEdit className="text-white lg:hidden max-sm:text-[12px]" />
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
            {/* Kurs nomi */}
            <label
              className="flex gap-2 text-[#d47323cd] flex-col mb-5"
              htmlFor="kurs"
            >
              Kurs nomi
              <input
                defaultValue={course.courseTitle}
                name="title"
                className="px-2 py-2 text-gray-700 border rounded-md "
                id="kurs"
                type="text"
                placeholder="Kurs nomini kiriting !"
              />
            </label>

            {/* Sana */}
            <div className="flex justify-between w-full mb-5">
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

            {/* Teacher tanlash */}
            <label className="flex gap-2 text-[#d47323cd] flex-col mb-10">
              Teacherni tanlang*
              <Select value={teacher} onValueChange={(val) => setTeacher(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="O'qituvchi tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {teachers?.map((t) => (
                    <SelectItem key={t._id} value={t._id}>
                      {t.teacherName} {t.teacherSurname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

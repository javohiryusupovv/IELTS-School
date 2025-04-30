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


function CreateCourse() {
  const [courseTitle, setCourseTitle] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectDay, setSelectDay] = useState("toq")

  const [open, setOpen] = useState(false);
  const pathname = usePathname()

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
  let filteredDay = courseDays.filter((day)=> {
    let dayNumber = new Date(day).getDate();
    return selectDay === 'juft' ? dayNumber % 2 === 0 : dayNumber % 2 !== 0;
  })
  const handleSelectDay = (dayType: string) => {
    setSelectDay(dayType)
  }

  const totalValue = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!courseTitle || !teacherId) {
      alert("Sizdagi karobkalar bo'sh");
      return;
    }
   
    try {
      const course = postCourse(courseTitle, teacherId, startDate ? startDate.toISOString() : "", endDate ? endDate.toISOString(): "", filteredDay, pathname)
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
            boxShadow: "0 0px 5px #17be5a56",
          },
        },
        error: "Something went wrong!",
      });
      setCourseTitle("");
      setTeacherId("");
      setStartDate(null)
      setEndDate(null)
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
          <button className="px-5 py-3 rounded-full bg-[#f18024] hover:bg-[#f18024ca] transition-all duration-200">
            <p className="text-[12px] font-medium text-white">
              Yangi Kurs qushish
            </p>
          </button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="mb-5">
            <SheetTitle>Yangi Kurs Yaratish</SheetTitle>
            <SheetDescription>
              Kurs yaratish uchun to&apos;ldirib chiqing !
            </SheetDescription>
          </SheetHeader>
          <div className="w-full mb-5">
            <label
              className="flex gap-2 text-[#d47323cd] flex-col mb-5"
              htmlFor="kurs"
            >
              Kurs nomi
              <input
                onChange={(e) => setCourseTitle(e.target.value)}
                value={courseTitle}
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
                <p className="text-[15px] mb-2 text-[#d47323cd]">Tugash kuni*</p>
                <DatapickerEnd endDate={endDate} setEndDate={setEndDate}/>
              </div>
            </div>
            <OddEvenDayFilter selectDay={selectDay}  filterDay={handleSelectDay}/>
            <label
              className="flex gap-2 text-[#d47323cd] flex-col mb-5"
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
                  <option key={teach._id} value={teach._id}>
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
                className="px-5 py-2 rounded-full bg-[#f18024] hover:bg-[#f18024ca] transition-all duration-200"
              >
                <p className="text-[15px] font-medium text-white">Saqlash</p>
              </button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default CreateCourse;

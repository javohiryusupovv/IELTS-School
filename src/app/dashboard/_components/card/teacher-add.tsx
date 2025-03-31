"use client"

import { createTeacher } from "@/actions/teacher.action";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function TeacherCreated() {
      const [open, setOpen] = useState(false)
      const [teacherName, setTeacherName] = useState("")
      const router = useRouter()

      const handleTotal = async() => {
        if (!teacherName.trim()) {
            toast.error("Teacher nomini kiriting!");
            return;
          }
        try{

            toast.promise(createTeacher(teacherName), {
                loading: "Loading...",
                success: "Teacher muvaffaqiyatli qo‘shildi!",
                error: "Xatolik yuz berdi!",
            })
            router.push("/dashboard/teacher")
            setTeacherName("")
            setOpen(false)
        }catch(error){
            console.error("Xatolik:", error);
            toast.error("Xatolik yuz berdi!");
        }
      }

  return (
    <div>
        <Sheet open={open} onOpenChange={setOpen} >
        <SheetTrigger asChild>
          <button className="px-5 py-3 rounded-full bg-[#f18024] hover:bg-[#f18024ca] transition-all duration-200">
            <p className="text-[12px] font-medium text-white">
              Yangi O'qituvchi qo'shish
            </p>
          </button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="mb-5">
            <SheetTitle>Yangi O'qituvchi Yaratish</SheetTitle>
            <SheetDescription>
              O'qituvchi yaratish uchun to&apos;ldirib chiqing !
            </SheetDescription>
          </SheetHeader>
          <div className="w-full mb-5">
            <label className="flex gap-2 text-[#d47323cd] flex-col mb-5" htmlFor="kurs">
              Teacher ismi
              <input onChange={(e) => setTeacherName(e.target.value)} value={teacherName} className="py-2 border rounded-md px-2 text-gray-700" id="kurs" type="text" placeholder="Teacher ismini kiriting !" />
            </label>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <button onClick={handleTotal} type="submit" className="px-5 py-2 rounded-full bg-[#f18024] hover:bg-[#f18024ca] transition-all duration-200">
                <p className="text-[15px] font-medium text-white">Saqlash</p>
              </button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default TeacherCreated
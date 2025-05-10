"use client";

import { createTeacher } from "@/actions/teacher.action";
import { TeacherSchemaZod } from "@/actions/zod";
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
import { formatUzbekPhone } from "@/utils/PhoneFormatter";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function TeacherCreated() {
  const [open, setOpen] = useState(false);
  const [teacherName, setTeacherName] = useState("");
  const [teacherSurname, setTeacherSurname] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("+998 ");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [iserror, setError] = useState<string[]>([]);
  const pathname = usePathname();

  const handleTotal = async () => {
    const validateTeacher = TeacherSchemaZod.safeParse({
      name: teacherName,
      surname: teacherSurname,
      password: teacherPassword,
    })

    if (!validateTeacher.success) {
      const errorMessage = validateTeacher.error.errors.map((err) => err.message);
      setError(errorMessage)      
      return;
    }    
    const { name, surname, password } = validateTeacher.data;
    const role = "o'qituvchi"; // Define the role variable
    try {
      const promise = createTeacher(
        name,
        surname,
        teacherPhone,
        password,
        role,
        pathname
      );
      toast.promise(promise, {
        loading: "Loading...",
        success: {
          message: "O'qituvchi yaratildi!",
          duration: 2500,
          style: {
            height: "50px", // fon yashil bo'ladi
            color: "green",
            border: "1px solid #17be5a",
            backgroundColor: "white",
          },
        },
        error: "Xatolik yuz berdi!",
      });
      await promise;
      setTeacherName("");
      setTeacherSurname("");
      setTeacherPhone("+998 ");
      setTeacherPassword("");
      setError([])
      setOpen(false);
    } catch (error) {
      console.error("Xatolik:", error);
      toast.error("Xatolik yuz berdi!");
    }
  };

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
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
            <label
              className="flex gap-2 text-[#d47323cd] flex-col mb-5"
              htmlFor="kurs"
            >
              Teacher ismi
              <input
                onChange={(e) => {
                  setTeacherName(e.target.value);
                  setError(prev => {
                    const newErrors = [...prev];
                    newErrors[0] = "";
                    return newErrors;
                  });
                }}
                value={teacherName}
                className={`py-2 border rounded-md px-2 text-gray-700 transition-all duration-200 ${iserror[0] ? "border-red-600 border-[1.5px]" : "border-gray-300"}`}
                id="kurs"
                type="text"
                placeholder="Teacher ismini kiriting !"
                required
              />
              <span className="text-[12px] font-light text-red-600">{iserror[0]}</span>
            </label>
            <label
              className="flex gap-2 text-[#d47323cd] flex-col mb-5"
              htmlFor="kurs"
            >
              Teacher familiyasi
              <input
                onChange={(e) => {
                  setTeacherSurname(e.target.value);
                  setError(prev => {
                    const newErrors = [...prev];
                    newErrors[1] = "";
                    return newErrors;
                  });
                }}
                value={teacherSurname}
                className={`py-2 border rounded-md px-2 text-gray-700 transition-all duration-200 ${iserror[1] ? "border-red-600 border-[1.5px]" : "border-gray-300"}`}
                id="kurs"
                type="text"
                placeholder="Teacher ismini kiriting !"
                required
              />
              <span className="text-[12px] font-light text-red-600">{iserror[1]}</span>
            </label>
            <label
              className="flex gap-2 text-[#d47323cd] flex-col mb-5"
              htmlFor="kurs"
            >
              Teacher number
              <input
                onChange={(e) => setTeacherPhone(formatUzbekPhone(e.target.value))}
                value={teacherPhone}
                className="py-2 border rounded-md px-2 text-gray-700 border-gray-300"
                id="kurs"
                type="text"
                placeholder="Teacher uchun raqam kiriting"
                required
              />
            </label>
            <label
              className="flex gap-2 text-[#d47323cd] flex-col mb-5"
              htmlFor="kurs"
            >
              Teacher password
              <input
                onChange={(e) => {
                  setTeacherPassword(e.target.value);
                  setError(prev => {
                    const newErrors = [...prev];
                    newErrors[2] = "";
                    return newErrors;
                  });
                }}
                value={teacherPassword}
                className={`py-2 border rounded-md px-2 text-gray-700 transition-all duration-200 ${iserror[2] ? "border-red-600 border-[1.5px]" : "border-gray-300"}`}
                id="kurs"
                type="text"
                placeholder="Teacher uchun password kiriting !"
                required
              />
              <span className="text-[12px] font-light text-red-600">{iserror[2]}</span>
            </label>
          </div>
          <SheetFooter>
              <button
                onClick={handleTotal}
                type="submit"
                className="px-5 py-2 rounded-full bg-[#f18024] hover:bg-[#f18024ca] transition-all duration-200"
              >
                <p className="text-[15px] font-medium text-white">Saqlash</p>
              </button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default TeacherCreated;

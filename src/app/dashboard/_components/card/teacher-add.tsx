"use client";

import { createTeacher } from "@/actions/teacher.action";
import { TeacherSchemaZod } from "@/actions/zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { FaUserPlus } from "react-icons/fa";

function TeacherCreated() {
  const [open, setOpen] = useState(false);
  const [teacherName, setTeacherName] = useState("");
  const [teacherSurname, setTeacherSurname] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [iserror, setError] = useState<string[]>([]);
  const pathname = usePathname();

  const handleTotal = async () => {
    const validateTeacher = TeacherSchemaZod.safeParse({
      name: teacherName,
      surname: teacherSurname,
      password: teacherPassword,
      phoneNumber: teacherPhone
    });

    if (!validateTeacher.success) {
      const errorMessage = validateTeacher.error.errors.map(
        (err) => err.message
      );
      setError(errorMessage);
      return;
    }
    const { name, surname, password, phoneNumber } = validateTeacher.data;
    const role = "o'qituvchi"; // Define the role variable
    try {
      const promise = createTeacher(
        name,
        surname,
        phoneNumber,
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
      setTeacherPhone("");
      setTeacherPassword("");
      setError([]);
      setOpen(false);
    } catch (error) {
      console.error("Xatolik:", error);
      toast.error("Xatolik yuz berdi!");
    }
  };

  const handlePhoneNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let resValue = value.replace(/\D/g, "")
    if (resValue.length >= 8) {
      e.target.value = resValue.slice(0, 9); // Limit to 8 characters
    }
  };



  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="md:px-5 md:py-3 py-2 px-4 md:rounded-full rounded-sm bg-[#f18024] hover:bg-[#f18024ca] transition-all duration-200">
            <p className="text-[12px] font-medium text-white max-md:hidden">
              Yangi O'qituvchi qo'shish
            </p>
            <FaUserPlus color="white" className=" md:hidden" />
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
                  setError((prev) => {
                    const newErrors = [...prev];
                    newErrors[0] = "";
                    return newErrors;
                  });
                }}
                value={teacherName}
                className={`py-2 border rounded-md px-2 text-gray-700 transition-all duration-200 ${iserror[0]
                    ? "border-red-600 border-[1.5px]"
                    : "border-gray-300"
                  }`}
                id="kurs"
                type="text"
                placeholder="Teacher ismini kiriting !"
                required
              />
              <span className="text-[12px] font-light text-red-600">
                {iserror[0]}
              </span>
            </label>
            <label
              className="flex gap-2 text-[#d47323cd] flex-col mb-5"
              htmlFor="kurs"
            >
              Teacher familiyasi
              <input
                onChange={(e) => {
                  setTeacherSurname(e.target.value);
                  setError((prev) => {
                    const newErrors = [...prev];
                    newErrors[1] = "";
                    return newErrors;
                  });
                }}
                value={teacherSurname}
                className={`py-2 border rounded-md px-2 text-gray-700 transition-all duration-200 ${iserror[1]
                    ? "border-red-600 border-[1.5px]"
                    : "border-gray-300"
                  }`}
                id="kurs"
                type="text"
                placeholder="Teacher ismini kiriting !"
                required
              />
              <span className="text-[12px] font-light text-red-600">
                {iserror[1]}
              </span>
            </label>
            <label
              className="flex gap-2 text-[#d47323cd] flex-col mb-5"
              htmlFor="kurs"
            >
              Teacher number
              <article className={`group flex gap-2 items-center rounded border px-3 focus-within:border-orange-500 transition-all duration-200`}>
                <span className="text-[14px] text-gray-500">+998 </span>
                <input
                  onChange={(e) => setTeacherPhone(e.target.value)}
                  onInput={handlePhoneNumberInput}
                  value={teacherPhone}
                  className="py-2 w-full text-gray-700 outline-none"
                  id="kurs"
                  type="number"
                  placeholder="Telefon raqam kiriting"
                  required
                />
              </article>

            </label>
            <label
              className="flex gap-2 text-[#d47323cd] flex-col mb-5"
              htmlFor="kurs"
            >
              Teacher password
              <input
                onChange={(e) => {
                  setTeacherPassword(e.target.value);
                  setError((prev) => {
                    const newErrors = [...prev];
                    newErrors[2] = "";
                    return newErrors;
                  });
                }}
                value={teacherPassword}
                className={`py-2 border rounded-md px-2 text-gray-700 transition-all duration-200 ${iserror[2]
                    ? "border-red-600 border-[1.5px]"
                    : "border-gray-300"
                  }`}
                id="kurs"
                type="text"
                placeholder="Teacher uchun password kiriting !"
                required
              />
              <span className="text-[12px] font-light text-red-600">
                {iserror[2]}
              </span>
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

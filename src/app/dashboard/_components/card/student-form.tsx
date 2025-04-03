"use client"

import { postAddStudent } from "@/actions/student.action";
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
import { ICourse } from "@/types/type";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
export default function StudentForm({propCourses}: {propCourses: ICourse[]}) {
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [courseId, setCourseId] = useState("");
    const [phone, setPhone] = useState("+998 ");
    const [open, setOpen] = useState(false);
    const pathname = usePathname()
    
    
    useEffect(() => {
          setCourses(propCourses)
      }, [propCourses])
    
    

    // Telefon raqamini to'g'ri formatga keltirish
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ""); // Faqat raqamlarni qoldiramiz
        value = value.replace(/^998/, ""); // Agar 998 ni kiritsa, olib tashlaymiz
        value = value.slice(0, 9); // Maksimal 9 ta raqam kiritish mumkin
        setPhone("+998 " + value);
    };

    const checkForm = () => {
        if (!name) {
            toast.error("Iltimos, ismingizni kiriting!");
            return false;
        } 
        if (!surname) {
            toast.error("Iltimos, familiyangizni kiriting!");
            return false;
        } 
        if (!courseId) {   
            toast.error("Iltimos, kursni tanlang!");
            return false;
        } 
        if (!phone) {
            toast.error("Iltimos, ota yoki ona telefon raqamini to‘liq kiriting!");
            return false;
        }
        return true
    }

    const handleStudentAdd = async () => {
        const isValid = checkForm();
        if (!isValid) return;
        try{

            const coursesName = courses.find((course) => course._id === courseId);
            const coursess = coursesName?.courseTitle.split(" ")[0];



            await toast.promise(postAddStudent(courseId, name, surname, phone, pathname), {
                loading: "O'quvchi qo'shilmoqda...",
                success: `${coursess} kursiga qo'shildi!`,
                error: "O'quvchini qo'shishda xatolik!",
            });
        }catch(error){
            console.error("Xatolik yuz berdi, o'quvchini qo'shishda!");
            return;
        }
        setName("");
        setSurname("");
        setCourseId("");
        setPhone("+998 ");
    };

    return (
        <div>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <button className="px-5 py-3 rounded-full bg-[#f18024] hover:bg-[#f18024ca] transition-all duration-200">
                        <p className="text-[12px] font-medium text-white">
                            Student yaratish
                        </p>
                    </button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader className="mb-5">
                        <SheetTitle>Yangi o'quvchi qo'shish</SheetTitle>
                        <SheetDescription>
                            O'quvchi yaratish uchun to&apos;ldirib chiqing!
                        </SheetDescription>
                    </SheetHeader>
                    <div className="w-full mb-5">
                        <label className="flex gap-2 text-[#d47323cd] flex-col mb-5">
                            Ismi *
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className="py-2 border rounded-md px-2 text-gray-700"
                                type="text"
                                placeholder="O'quvchi ismi!"
                            />
                        </label>
                        <label className="flex gap-2 text-[#d47323cd] flex-col mb-5">
                            Familiya *
                            <input
                                onChange={(e) => setSurname(e.target.value)}
                                value={surname}
                                className="py-2 border rounded-md px-2 text-gray-700"
                                type="text"
                                placeholder="O'quvchi Familiyasi!"
                            />
                        </label>
                        <article className="mb-5">
                            <p className="mb-3 text-[#d47323cd]">Kursni tanlang *</p>
                            <select
                                className="w-full py-2 rounded-md border"
                                onChange={(e) => setCourseId(e.target.value)}
                                value={courseId}
                            >
                                <option value="">kursni tanlang ..</option>
                                {courses.map((course: ICourse)=> (
                                    <option key={course._id} value={course._id}>
                                        {course.courseTitle}
                                    </option>
                                ))}
                            </select>
                        </article>
                        <label className="flex gap-2 text-[#d47323cd] flex-col mb-5">
                            Phone *
                            <input
                                onChange={handlePhoneChange}
                                value={phone}
                                className="py-2 border rounded-md px-2 text-gray-700"
                                type="text"
                                placeholder="Ota-Ona Telefon raqami!"
                            />
                        </label>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <button
                                onClick={handleStudentAdd}
                                type="button"
                                className="px-5 py-2 rounded-full bg-[#f18024] hover:bg-[#f18024ca] transition-all duration-200"
                            >
                                <p className="text-[15px] font-medium text-white">Qo'shish</p>
                            </button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}

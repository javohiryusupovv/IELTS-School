"use client"

import { postAddStudent } from "@/actions/student.action";
import { StudentSchemaZod } from "@/actions/zod";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
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

import { ICourse } from "@/types/type";
import { generateRandomID } from "@/utils/generateID";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FaUserPlus } from "react-icons/fa";
import { Calendar } from "@/components/ui/calendar";
import BrithdayCalendar from "../brithday/BrithdayCalendar";

export default function StudentForm({ propCourses }: { propCourses: ICourse[] }) {
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [studentName, setStudentName] = useState("");
    const [studentSurname, setStudentSurname] = useState("");
    const [studentCourseId, setStudentCourseId] = useState("");
    const [phone, setPhone] = useState("");
    const [familiyNumber, setFamiliyNumber] = useState("");
    const [ispassword, setPassword] = useState("")
    const [open, setOpen] = useState(false);
    const [birthday, setBirthday] = useState<Date | undefined>(undefined); 
    const [iserror, setError] = useState<string[]>([]);
    const pathname = usePathname()


    useEffect(() => {
        setCourses(propCourses)
    }, [propCourses])


    const handleStudentAdd = async () => {

        const validateStudent = StudentSchemaZod.safeParse({
            courseSelect: studentCourseId,
            name: studentName,
            surname: studentSurname,
            password: ispassword
        })

        if (!validateStudent.success) {
            const errorMessage = validateStudent.error.errors.map((err) => err.message)
            setError(errorMessage)
            return
        }

        const { courseSelect, name, surname, password } = validateStudent.data;

        try {

            const studentGen = generateRandomID();
            const promise = postAddStudent(courseSelect, name, surname, password, phone, familiyNumber, studentGen, pathname, birthday);
            toast.promise(promise, {
                loading: "O'quvchi qo'shilmoqda...",
                success: {
                    message: `O'quvchi yaratildi! (${studentName} ${studentSurname})`,
                    duration: 2500,
                    style: {
                        height: "50px", // fon yashil bo'ladi
                        color: "green",
                        border: "1px solid #17be5a",
                        backgroundColor: "white",
                    },
                },
                error: "O'quvchini qo'shishda xatolik!",
            });
            await promise;
            setOpen(false)
        } catch (error) {
            console.error("Xatolik yuz berdi, o'quvchini qo'shishda!");
            return;
        }
        setStudentName("");
        setStudentSurname("");
        setStudentCourseId("");
        setFamiliyNumber("")
        setPassword("")
        setPhone("");
        setBirthday(undefined);
        setError([])
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
                    <button className="px-5 py-3 rounded-full bg-[#f18024] hover:bg-[#f18024ca] transition-all duration-200">
                        <p className="text-[12px] font-medium text-white max-md:hidden">
                            Student yaratish
                        </p>
                        <FaUserPlus className="text-white md:hidden" />
                    </button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader className="sm:mb-5 mb-3 max-sm:space-y-0">
                        <SheetTitle className="text-[20px] max-sm:text-[17px]">Yangi o'quvchi qo'shish</SheetTitle>
                        <SheetDescription className="max-sm:text-[12px] text-[15px]">
                            O'quvchi yaratish uchun to&apos;ldirib chiqing!
                        </SheetDescription>
                    </SheetHeader>
                    <div className="w-full sm:mb-5 mb-3">
                        <label className="flex gap-2 max-sm:text-[14px] text-[#d47323cd] flex-col sm:mb-5 mb-3">
                            Ismi *
                            <input
                                onChange={(e) =>
                                    setStudentName(e.target.value)
                                }
                                value={studentName}
                                className="py-2 border rounded-md px-2 text-gray-700"
                                type="text"
                                placeholder="O'quvchi ismi!"
                            />
                        </label>
                        <label className="flex gap-2 max-sm:text-[14px] text-[#d47323cd] flex-col sm:mb-5 mb-3">
                            Familiya *
                            <input
                                onChange={(e) =>
                                    setStudentSurname(e.target.value)
                                }
                                value={studentSurname}
                                className="py-2 border rounded-md px-2 text-gray-700"
                                type="text"
                                placeholder="O'quvchi familiyasi!"
                            />
                        </label>
                        <label className="flex gap-2 max-sm:text-[14px] text-[#d47323cd] flex-col sm:mb-5 mb-3">
                            Tug'ilgan kun *
                            <BrithdayCalendar value={birthday} onChange={setBirthday} />
                        </label>
                        <article className="sm:mb-5 mb-3">
                            <p className="mb-3 max-sm:text-[14px] text-[#d47323cd]">Kursni tanlang *</p>
                            <Select value={studentCourseId} onValueChange={setStudentCourseId}>
                                <SelectTrigger className="w-full py-2 rounded-md border">
                                    <SelectValue placeholder="Kursni Tanlang ..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((course: ICourse) => (
                                        <SelectItem
                                            key={course._id}
                                            value={course._id}
                                            className="max-sm:text-[14px] hover:bg-orange-400/70 hover:text-white transition-all duration-200"
                                        >
                                            {course.courseTitle}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>


                        </article>
                        <label className="flex gap-2 max-sm:text-[14px] text-[#d47323cd] flex-col sm:mb-5 mb-3">
                            Telefon raqam *
                            <article className={`group flex gap-2 items-center rounded border px-3 focus-within:border-orange-500 transition-all duration-200`}>
                                <span className="text-[14px] text-gray-500">+998 </span>
                                <input
                                    onChange={(e) => setPhone(e.target.value)}
                                    onInput={handlePhoneNumberInput}
                                    value={phone}
                                    className="py-2 w-full text-gray-700 outline-none"
                                    id="kurs"
                                    type="number"
                                    placeholder="90 070 02 51"
                                    required
                                />
                            </article>
                        </label>
                        <label className="flex gap-2 max-sm:text-[14px] text-[#d47323cd] flex-col sm:mb-5 mb-3">
                            Ota-ona raqami *
                            <article className={`group flex gap-2 items-center rounded border px-3 focus-within:border-orange-500 transition-all duration-200`}>
                                <span className="text-[14px] text-gray-500">+998 </span>
                                <input
                                    onChange={(e) => setFamiliyNumber(e.target.value)}
                                    onInput={handlePhoneNumberInput}
                                    value={familiyNumber}
                                    className="py-2 w-full text-gray-700 outline-none"
                                    id="kurs"
                                    type="number"
                                    placeholder="90 070 02 51"
                                    required
                                />
                            </article>
                        </label>
                        <label className="flex gap-2 max-sm:text-[14px] text-[#d47323cd] flex-col sm:mb-5 mb-3">
                            Parol *
                            <input
                                onChange={(e)=> setPassword(e.target.value)}
                                value={ispassword}
                                className="py-2 border rounded-md px-2 text-gray-700"
                                type="text"
                                placeholder="O'quvchi uchun parol kiriting!"
                            />
                        </label>
                    </div>
                    <SheetFooter>

                        <button
                            onClick={handleStudentAdd}
                            type="button"
                            className="px-5 py-2 rounded-full bg-[#f18024] hover:bg-[#f18024ca] transition-all duration-200"
                        >
                            <p className="text-[15px] font-medium text-white">Qo'shish</p>
                        </button>

                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}

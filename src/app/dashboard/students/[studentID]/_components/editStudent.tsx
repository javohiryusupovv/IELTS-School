"use client"

import { UserPen } from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { IStudent } from "@/types/type";
import { FormEvent, useState } from "react";
import { updateStudent } from "@/actions/student.action";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { iPropCourse } from "../../../../../../app.types";
import BrithdayCalendar from "@/app/dashboard/_components/brithday/BrithdayCalendar";

interface Props {
    student: IStudent;
    courses: iPropCourse[];
}

export default function EditStudent({ student, courses }: Props) {
    const [phone, setPhone] = useState(student.phone);
    const [parentPhone, setParentPhone] = useState(student.parentPhone || "");
    const [studentCourseId, setStudentCourseId] = useState(student.course._id);
    const [birthday, setBirthday] = useState<Date | undefined>(() =>
        parseBirthday(student.birthday)
    );
    const pathname = usePathname();

    async function onUpdateStudent(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            const data = {
                name: formData.get("name") as string,
                surname: formData.get("surname") as string,
                phone: formData.get("phone") as string,
                password: formData.get("password") as string,
                parentPhone: formData.get("parentPhone") as string,
                birthday: birthday ?? new Date(),
                course: studentCourseId,
            };

            const updatedStudent = updateStudent(student._id, data, pathname);

            toast.promise(updatedStudent, {
                loading: "Yuklanmoqda...",
                success: {
                    message: "O'quvchi ma'lumotlari yangilandi!",
                    duration: 2500,
                    style: {
                        height: "50px",
                        color: "green",
                        border: "1px solid #17be5a",
                        backgroundColor: "white",
                    },
                },
                error: "O'quvchini yangilashda xatolik!",
            });
            await updatedStudent;
        } catch (err) {
            console.log(err);
        }
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.replace(/^998/, "");
        value = value.slice(0, 9);
        setter(value);
    };

    return (
        <div className="mb-1">
            <Sheet>
                <SheetTrigger asChild>
                    <button className=" relative top-0 left-0 group border rounded-full p-[5px] hover:bg-orange-500 transition-all duration-300 border-orange-400">
                        <p className=" absolute top-0 left-9 rounded-sm max-studentCard:-left-[78px] max-studentCard:top-0 px-2 py-1 text-[12px] border text-orange-600 border-orange-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">Tahrirlash</p>
                        <UserPen className=" w-5 h-5 group-hover:stroke-white stroke-1 transition-all duration-300 group-hover:border-transparent" />
                    </button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto max-h-screen">
                    <SheetHeader className="mb-5">
                        <SheetTitle>O'quvchini Tahrirlash</SheetTitle>
                        <SheetDescription>
                            O'quvchini tahrirlash uchun to&apos;ldirib chiqing!
                        </SheetDescription>
                    </SheetHeader>
                    <form id="edit-student-form" onSubmit={onUpdateStudent} className="w-full mb-5">
                        {/* Name */}
                        <label className="flex gap-2 text-[#d47323cd] flex-col mb-5">
                            Ismi *
                            <input
                                name="name"
                                defaultValue={student.name}
                                className="py-2 border rounded-md px-2 text-gray-700"
                                type="text"
                                placeholder="O'quvchi ismi!"
                            />
                        </label>
                        {/* Surname */}
                        <label className="flex gap-2 text-[#d47323cd] flex-col mb-5">
                            Familiya *
                            <input
                                name="surname"
                                defaultValue={student.surname}
                                className="py-2 border rounded-md px-2 text-gray-700"
                                type="text"
                                placeholder="O'quvchi familiyasi!"
                            />
                        </label>
                        {/* Birthday */}
                        <label className="flex gap-2 text-[#d47323cd] flex-col mb-5">
                            Tug‘ilgan sana *
                            <BrithdayCalendar value={birthday} onChange={setBirthday} />
                        </label>
                        {/* Course */}
                        <article className="mb-5">
                            <p className="mb-3 text-[#d47323cd]">Kursni tanlang *</p>
                            <Select value={studentCourseId} onValueChange={setStudentCourseId}>
                                <SelectTrigger className="w-full py-2 rounded-md border">
                                    <SelectValue placeholder="Kursni Tanlang ..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((course) => (
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
                        {/* Phone */}
                        <label className="flex gap-2 text-[#d47323cd] flex-col mb-5">
                            Telefon raqami *
                            <article className="group flex gap-2 items-center rounded border px-3 focus-within:border-orange-500 transition-all duration-200">
                                <span className="text-[14px] text-gray-500">+998 </span>
                                <input
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => handlePhoneChange(e, setPhone)}
                                    className="py-2 w-full outline-none rounded-md px-2 text-gray-700"
                                    type="text"
                                    placeholder="O'quvchi raqami"
                                />
                            </article>
                        </label>
                        {/* Parent Phone */}
                        <label className="flex gap-2 text-[#d47323cd] flex-col mb-5">
                            Ota-ona raqami *
                            <article className="group flex gap-2 items-center rounded border px-3 focus-within:border-orange-500 transition-all duration-200">
                                <span className="text-[14px] text-gray-500">+998 </span>
                                <input
                                    name="parentPhone"
                                    value={parentPhone}
                                    onChange={(e) => handlePhoneChange(e, setParentPhone)}
                                    className="py-2 w-full outline-none rounded-md px-2 text-gray-700"
                                    type="text"
                                    placeholder="Ota-ona telefon raqami"
                                />
                            </article>
                        </label>
                        {/* Password */}
                        <label className="flex gap-2 max-sm:text-[14px] text-[#d47323cd] flex-col sm:mb-5 mb-3">
                            Yangi Password *
                            <input
                                name="password"
                                className="py-2 border rounded-md px-2 text-gray-700"
                                type="text"
                                placeholder="O'quvchini parolini yangilang"
                            />
                        </label>
                    </form>
                    <SheetFooter>
                        <SheetClose asChild>
                            <button
                                type="submit"
                                form="edit-student-form"
                                className="px-5 py-2 rounded-full bg-[#f18024] hover:bg-[#f18024ca] transition-all duration-200"
                            >
                                <p className="text-[15px] font-medium text-white">Yangilash</p>
                            </button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}


function parseBirthday(value: unknown): Date | undefined {
    if (!value) return undefined;
    // agar massiv bo'lsa birinchi elementni oling
    if (Array.isArray(value)) {
        const v = value[0];
        if (!v) return undefined;
        const d = v instanceof Date ? v : new Date(String(v));
        return Number.isNaN(d.getTime()) ? undefined : d;
    }

    // agar Date obyekt bo'lsa
    if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? undefined : value;
    }

    // string yoki raqam bo'lsa new Date bilan urinib ko'ring
    const d = new Date(String(value));
    return Number.isNaN(d.getTime()) ? undefined : d;
}
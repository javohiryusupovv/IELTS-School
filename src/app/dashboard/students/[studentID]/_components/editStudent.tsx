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

interface Props {
    student: IStudent;
}

export default function EditStudent({ student }: Props) {
    const [phone, setPhone] = useState(student.phone || "+998");
    const pathname = usePathname()


    async function onUpdateStudent(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            const data = {
                name: formData.get("name") as string,
                surname: formData.get("surname") as string,
                phone: formData.get("phone") as string,
            }
            const updatedStudent = updateStudent(student._id, data, pathname);

            // Show success message with the toast
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
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ""); // Faqat raqamlarni qoldiramiz
        value = value.replace(/^998/, ""); // Agar 998 ni kiritsa, olib tashlaymiz
        value = value.slice(0, 9); // Maksimal 9 ta raqam kiritish mumkin
        setPhone("+998 " + value);
    };



    return (
        <div className="mb-1">

            <Sheet>
                <SheetTrigger asChild>
                    <button className=" relative top-0 left-0 group border rounded-full p-[5px] hover:bg-orange-500 transition-all duration-300 border-orange-400">
                        <p className=" absolute top-0 left-9 rounded-sm px-2 py-1 text-[12px] border text-orange-600 border-orange-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">Tahrirlash</p>
                        <UserPen className=" w-5 h-5 group-hover:stroke-white stroke-1 transition-all duration-300 group-hover:border-transparent" />
                    </button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader className="mb-5">
                        <SheetTitle>O'quvchini Tahrirlash</SheetTitle>
                        <SheetDescription>
                            O'quvchini tahrirlash uchun to&apos;ldirib chiqing!
                        </SheetDescription>
                    </SheetHeader>
                    <form id="edit-student-form" onSubmit={onUpdateStudent} className="w-full mb-5">
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
                        <label className="flex gap-2 text-[#d47323cd] flex-col mb-5">
                            Familiya *
                            <input
                                name="surname"
                                defaultValue={student.surname}
                                className="py-2 border rounded-md px-2 text-gray-700"
                                type="text"
                                placeholder="O'quvchi Familiyasi!"
                            />
                        </label>
                        <article className="mb-5">
                            <p className="mb-3 text-[#d47323cd]">Kursni tanlang *</p>
                            <select disabled={true} defaultValue={student.course.courseTitle}
                                className="w-full py-2 rounded-md border">
                                <option value="">{student.course.courseTitle}</option>
                            </select>
                        </article>
                        <label className="flex gap-2 text-[#d47323cd] flex-col mb-5">
                            Phone *
                            <input
                                name="phone"
                                value={phone}
                                onChange={handlePhoneChange}
                                className="py-2 border rounded-md px-2 text-gray-700"
                                type="text"
                                placeholder="Ota-Ona Telefon raqami!"
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

"use client"

import { DeleteCourse } from "@/actions/course.action";
import { toast } from "sonner";
import { ICourse } from "@/types/type";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    course: ICourse
}

export default function Actions({ course }: Props) {
    const router = useRouter();
    const pathname = usePathname()
    const [textStatus, settextStatus] = useState(false); 
        
    const onDelete = () => {
        settextStatus(true);
        const toastId = toast.loading("O'chirilmoqda...");
        DeleteCourse(course._id, pathname)
        .then(() => {
            // 2. Muvaffaqiyatli o'chirilganda toasti yangilash
            toast.success("Muvaffaqiyatli o'chirildi!", { id: toastId });
            router.push("/dashboard/courses");
        })
        .catch(() => {
            // 3. Xatolik bo'lsa toastni yangilash
            toast.error("Xatolik yuz berdi!", { id: toastId });
        })
        .finally(()=> {
            settextStatus(false)
        })
    }
    
    return (
        <div>
            <button onClick={onDelete} className="px-7 py-3 rounded-full bg-[#f18024] hover:bg-[#f18024ca] transition-all duration-200">
                <p className="text-[15px] font-medium text-white">
                    {textStatus ? "O'chirilmoqda" : "O'chirish"}
                </p>
            </button>
        </div>
    )
}

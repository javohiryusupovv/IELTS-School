"use client"

import { ResetPasswordAction } from "@/actions/teacher.check";
import { IoClose } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props{
    teacherRes: string
}

export default function ResetPassword({teacherRes}: Props) {
    
    const [istoggle, setIstoggle] = useState(false);
    const [newpassword, setNewPassword] = useState("");
    const pathname = usePathname();
    const [isloading, setLoading] = useState(false);

    const onToggle = async () => {
        setLoading(true);
        if (istoggle) {
            if(newpassword.length < 6) {
                toast.warning("Password kamida 6 ta belgidan iborat bo'lishi kerak!");
                return;
            }
            const res = await ResetPasswordAction(teacherRes, newpassword, pathname)
            if (res.success) {
                toast.success(`Parol muvaffaqiyatli yangilandi: ${newpassword}`);
              } else {
                toast.error("Parol yangilashda xatolik");
              }
        }
        setLoading(false);
        setIstoggle((prev) => !prev);
    };

    return (
        <div className="flex items-center gap-4">
            <button className={`px-4 py-[9px] cursor-pointer text-[14px] transition-all duration-300 ${istoggle ? "bg-green-400 hover:shadow-sm hover:shadow-green-400" : "bg-red-500"} text-white rounded-lg`} disabled={isloading} onClick={onToggle}>{istoggle ? "Yangilash" : "Yangi password"}</button>
            {istoggle ? (<IoClose className="w-8 h-7 p-1 border rounded-sm cursor-pointer bg-red-500/45 hover:bg-red-500 transition-all duration-200 fill-white" onClick={()=> setIstoggle(!istoggle)}/>) : ""}
            {istoggle ? (<input onChange={((e)=> setNewPassword(e.target.value))} value={newpassword} className="border px-3 py-2 outline-none focus:border-orange-500 rounded-md" type="text" placeholder="Yangi Password kiriting..." />) : ""}
        </div>
    )
}


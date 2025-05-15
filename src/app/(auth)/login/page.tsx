"use client"


import { TeacherLogin } from "@/actions/teacher.check";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeClosed } from 'lucide-react';


export default function login() {
    const [phone, setPhone] = useState("");
    const [isloading, setLoading] = useState(false)
    const [ispassword, setIsPassword] = useState("");
    const router = useRouter();
    const pathname = usePathname();
    const [eye, setEye] = useState(false)

    const hidePassword = () => {
        setEye(!eye)
    }

    const handleCheckTeacher = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const teacherLogins = await TeacherLogin(phone, ispassword, pathname);
            if (teacherLogins) { // Teacher topilsa
                localStorage.setItem("teacher", JSON.stringify(teacherLogins));
                toast.success("Teacher topildi", {
                    duration: 2000,
                    style: {
                        height: "50px",
                        color: "green",
                        border: "1px solid #17be5a",
                        backgroundColor: "white",
                    },
                });
                router.push("/teacher")
            } else { // Teacher topilmasa
                toast.error("Teacher topilmadi", {
                    duration: 2000,
                    style: {
                        height: "50px",
                        color: "red",
                        border: "1px solid #ff4343",
                        backgroundColor: "white",
                    },
                });
                router.push("/login")
            }
            console.log(teacherLogins);
        } catch (error) {
            setLoading(false);
            toast.error("Xatolik yuz berdi ...");
            console.error("Login xatolik:", error);
        } finally {
            setLoading(false);
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
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[400px] text-center px-8 py-16 border">
                <form onSubmit={handleCheckTeacher}>
                    <p className="text-[23px] font-semibold mb-5 text-orange-500">Login</p>
                    <article className={`group flex gap-2 items-center rounded border px-3 focus-within:border-orange-500 transition-all duration-200 mb-5`}>
                        <span className="text-[14px] text-gray-500">+998 </span>
                        <input autoComplete="off" onChange={(e) => setPhone(e.target.value)} value={phone} onInput={handlePhoneNumberInput} disabled={isloading} className="py-2 w-full text-gray-700 outline-none"  type="text" placeholder="Login kiriting ..." />
                    </article>
                    
                    <Label className="flex items-center justify-between gap-2 border px-2 rounded-md focus-within:border-orange-500 focus-within:border-1 mb-5">
                        <input autoComplete="new-password" onChange={(e) => setIsPassword(e.target.value)} value={ispassword} disabled={isloading} className="border-0 outline-none py-3 w-full text-[15px] font-normal" type={eye ? "text" : "password"} placeholder="Password kiriting" />
                        <p className="cursor-pointer"  onClick={hidePassword}>{eye ? <Eye/> : <EyeClosed/>}</p>
                    </Label>
                    <button className="px-8 py-2 cursor-pointer rounded-md bg-orange-500 text-white transition-all duration-200 hover:shadow-md hover:shadow-orange-600 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:shadow-none disabled:hover:shadow-transparent" disabled={isloading}> {isloading ? "Qidirilmoqda" : "Qidirish"}</button>
                </form>
            </div>
        </div>
    )
}

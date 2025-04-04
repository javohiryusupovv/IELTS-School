"use client"


import { TeacherLogin } from "@/actions/teacher.check";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function login() {
    const [phone, setPhone] = useState("");
    const [isloading, setLoading] = useState(false)
    const [ispassword, setIsPassword] = useState("");
    const router = useRouter();
    const pathname = usePathname()

    const handleCheckTeacher = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const teacherLogins = await TeacherLogin(phone, ispassword, pathname);
            if (teacherLogins) { // Teacher topilsa
                localStorage.setItem("teacher", JSON.stringify(teacherLogins));
                toast.success("Teacher topildi !");
                router.push("/teacher")
            } else { // Teacher topilmasa
                toast.error("Teacher topilmadi ...");
                router.push("/login")
            }
        } catch (error) {
            setLoading(false);
            toast.error("Xatolik yuz berdi ...");
            console.error("Login xatolik:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[300px] text-center">
                <form onSubmit={handleCheckTeacher}>
                    <p className="text-[23px] font-semibold mb-5">Login</p>
                    <Input onChange={(e) => setPhone(e.target.value)} value={phone} disabled={isloading} className="mb-3 outline-none" type="text" placeholder="PhoneNumber kiriting" />
                    <Input onChange={(e) => setIsPassword(e.target.value)} value={ispassword} disabled={isloading} className="mb-3 outline-none" type="password" placeholder="Password kiriting" />
                    <Button disabled={isloading}> {isloading ? "Qidirilmoqda" : "Qidirish"}</Button>
                </form>
            </div>
        </div>
    )
}

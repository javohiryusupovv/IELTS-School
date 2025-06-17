"use client";

import { StudentCheck } from "@/actions/student.check";
import { IDSchema } from "@/actions/zod";
import { Label } from "@/components/ui/label";
import { initSDK } from "@/lib/initSDK";
import { usePathname, useRouter } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import LogoStudent from "../../../../public/logo/logo.png"
import Image from "next/image";
import { Eye, EyeOff } from 'lucide-react';



export default function StudentLogin() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const loader = useTopLoader();
  const [eyeHide, setEyeHide] = useState(false)


  useEffect(() => {
    initSDK().catch(console.error);
  }, []);

  const handleChangeEye = () => {
    setEyeHide(!eyeHide)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loader.start()
    const data = new FormData(e.currentTarget)
    const idStudent = data.get("id") as string;
    const ispasswordStudent = data.get("password") as string;
    const validateID = IDSchema.safeParse(idStudent);

    try {
      setIsLoading(true);
      const students = await StudentCheck(idStudent, ispasswordStudent, pathname);
      if (students.success) {
        localStorage.setItem("studentID", JSON.stringify(students));
        toast.success("Siz Talabasiz", {
          duration: 2000,
          style: {
            height: "50px",
            marginTop: "40px",
            color: "green",
            border: "1px solid #17be5a",
            backgroundColor: "white",
          },
        });
        router.push("/student");
      } else {
        toast.warning("Siz Talabalar safida yo'qsiz", {
          duration: 2000,
          style: {
            height: "50px",
            marginTop: "40px",
            color: "red",
            border: "1px solid red",
            backgroundColor: "white",
          },
        });
        setIsLoading(false)
      }
    } catch (error) {
      toast.error(`Xatolik: ${error}`);
      setIsLoading(false);
    } finally {
      loader.done()
    }
  };

  return (
    <div className="max-sm:w-[280px] w-[350px] md:w-[400px] lg:w-[460px] xl:w-[500px] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center m-auto">
      <article className="mb-10">
        <Image src={LogoStudent} className="w-[150px]" alt="Logo Student" />
      </article>
      <form onSubmit={handleSubmit} className="text-center w-full">
        <article className="flex flex-col items-start mb-4">
          <label htmlFor="" className="mb-2">Login <span className="text-red-600">*</span></label>
          <Label className="flex p-2 w-full border rounded-md items-center text-[15px] font-medium focus-within:border-orange-500 focus-within:border-1 mb-5">
            <span className="text-gray-400 font-normal text-[17px]">iq-</span>
            <input
              className="w-full outline-none h-full bg-transparent"
              type="text"
              pattern="[0-9]*"
              maxLength={5}
              name="id"
              disabled={isLoading}
              placeholder="ID kiriting ..."
            />
          </Label>
        </article>
        <article className="flex flex-col items-start mb-10">
          <label htmlFor="" className="mb-2">password <span className="text-red-600">*</span></label>
          <article className="flex w-full items-center gap-5 px-2 rounded border focus-within:border-orange-500 focus-within:border-1">
            <input name="password" className="w-full py-2  outline-none " type={eyeHide ? "text" : "password"} placeholder="Parol kiriting ..." />
            <p className="cursor-pointer p-1 hover:bg-[#d0d0d087] rounded-full transition-all duration-200" onClick={handleChangeEye}>{eyeHide ? <Eye className="w-5 h-5 stroke-orange-500" /> : <EyeOff className="w-5 h-5 stroke-orange-500" />}</p>
          </article>
        </article>
        <button className={`w-[150px] px-3 py-2 rounded cursor-pointer text-white bg-orange-500 hover:bg-orange-500/80 ${isLoading && "bg-orange-500/80"}`} disabled={isLoading} type="submit">
          {isLoading ? "Kirilmoqda..." : "Kirish"}
        </button>
      </form>
    </div>
  );
}

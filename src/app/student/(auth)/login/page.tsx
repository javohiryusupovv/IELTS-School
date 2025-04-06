"use client"

import { StudentCheck } from "@/actions/student.check";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function StudentLogin() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget)
    const idStudent = data.get("id") as string;
    try{
      setIsLoading(true)
      const students = await StudentCheck(idStudent, pathname);
      if(students){
        localStorage.setItem("studentID", JSON.stringify(students))
        toast.success("Siz Talabasiz")
        router.push("/student")
      }else{
        toast.warning("Siz Talabalar safida yuqsiz")
        router.push("/student/login")
      }
    }catch(error){
      throw new Error(`Sizda Xatolik yuz berdi, ${error}`)
    }finally{
      setIsLoading(false)
    }
    
    
  }

  return (
    <div className="w-[250px] h-screen flex items-center m-auto">
      <form onSubmit={handleSubmit} className="text-center">
        <Label className="text-[18px] font-medium">
          Student ID*
          <input
            className="my-5 border p-2 w-full rounded-md outline-none text-[15px] font-normal focus-within:border-orange-500 focus-within:border-1"
            type="text"
            name="id"
            disabled={isLoading}
            placeholder="ID kiriting ..."
          />
        </Label>
        <Button disabled={isLoading} type="submit">{isLoading ? "Kirilmoqda..." : "Kirish"}</Button>
      </form>
    </div>
  );
}

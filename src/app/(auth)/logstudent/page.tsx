"use client";

import { StudentCheck } from "@/actions/student.check";
import { IDSchema } from "@/actions/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function StudentLogin() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget)
    const idStudent = data.get("id") as string;

    const validateID = IDSchema.safeParse(idStudent)
    console.log(validateID);
    
    try {
      setIsLoading(true);
      const students = await StudentCheck(idStudent, pathname);
      if (students) {
        localStorage.setItem("studentID", JSON.stringify(students));
        toast.success("Siz Talabasiz");
        router.push("/student");
      } else {
        toast.warning("Siz Talabalar safida yuqsiz");
        router.push("/logstudent");
      }
    } catch (error) {
      throw new Error(`Sizda Xatolik yuz berdi, ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[250px] h-screen flex items-center m-auto">
      <form onSubmit={handleSubmit} className="text-center">
        <p className="mb-5 ">Student ID*</p>
        <Label className="flex p-2 w-full border rounded-md items-center text-[15px] font-medium focus-within:border-orange-500 focus-within:border-1 mb-5">
          <span className="text-gray-500 font-normal">iqtidor-</span>
          <input
            className="w-full outline-none h-full bg-transparent"
            type="text"
            pattern="[0-9]*"   // Faqat raqamlar (HTML validation)
            maxLength={5} 
            name="id"
            disabled={isLoading}
            placeholder="ID kiriting ..."
          />
        </Label>
        <Button disabled={isLoading} type="submit">
          {isLoading ? "Kirilmoqda..." : "Kirish"}
        </Button>
      </form>
    </div>
  );
}

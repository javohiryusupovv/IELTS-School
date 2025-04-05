"use client"

import { StudentCheck } from "@/actions/student.check";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "next/navigation";

export default function StudentLogin() {
  const pathname = usePathname();
  const router = useRouter()

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget)
    const idStudent = data.get("id") as string;
    try{
      const students = await StudentCheck(idStudent, pathname);
      if(students){
        localStorage.setItem("studentID", JSON.stringify(students))
        router.push("/student")
      }else{
        router.push("/student/login")
      }
    }catch(error){
      throw new Error(`Sizda Xatolik yuz berdi, ${error}`)
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
            placeholder="ID kiriting ..."
          />
        </Label>
        <Button type="submit">Kirish</Button>
      </form>
    </div>
  );
}

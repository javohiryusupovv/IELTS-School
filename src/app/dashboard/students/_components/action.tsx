"use client";

import { deleteStudent } from "@/actions/student.action";
import { Clock10, CircleX, Search, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  studentId: string;
  courseId: string;
}

interface StudentListProps {
  studentList: any;
}

export default function Action({ studentId, courseId }: Props) {
  const handleDelete = async () => {
    try {
      await toast.promise(
        deleteStudent(studentId, courseId, "/dashboard/students"),
        {
          loading: "O'chirilmoqda...",
          success: "Talaba o'chirildi",
          error: "O'chirishda xatolik",
        }
      );
    } catch (error) {
      console.error("O'chirishda xatolik:", error);
      toast.error("O'chirishda xatolik");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="group border rounded-full p-[5px] hover:bg-red-600 transition-all duration-300 border-red-500">
          <Trash className="w-[14px] h-[14px] group-hover:stroke-white stroke-1 stroke-red-600 transition-all duration-300 group-hover:border-transparent" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Siz Talabani o'chirmoqchimisz ?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-500 text-[14px]">
            Talabani o'chirish orqali siz barcha ma'lumotlarni o'chirasiz.
            O'chirishni davom ettirishni xohlaysizmi ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Yuq</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Ha</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function SearchFuture({ studentList }: StudentListProps) {
  const [searchStudent, setSearchStudent] = useState("");

  const filterStudent = studentList?.filter((student: any) =>
    `${student?.surname} ${student?.name}`
      .toLowerCase()
      .includes(searchStudent.toLowerCase())
  );
  // const dashboard/students = studentList.map((student: any)=> (
  //     console.log(student.course)
  // ))

  // console.log(searchStudent);

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <label className=" transition-all duration-300 flex justify-between w-64 items-center gap-2 border py-3 px-2 rounded-md focus-within:border-orange-500">
          {searchStudent.length >= 1 ? (
            ""
          ) : (
            <Search className="stroke-gray-400 w-5 h-5" />
          )}
          <input
            onChange={(e) => setSearchStudent(e.target.value)}
            value={searchStudent}
            type="text"
            placeholder="Qidirish..."
            className="w-full h-full outline-none"
          />
          {searchStudent.length >= 1 ? (
            <CircleX
              onClick={() => setSearchStudent("")}
              className="stroke-[1.5px] stroke-gray-400 w-5 h-5 cursor-pointer hover:stroke-red-500 transition-all duration-300"
            />
          ) : (
            ""
          )}
        </label>
      </div>
      <div className="absolute rounded shadow-2xl overflow-hidden bg-white pb-5 mt-2">
        <div>
          {searchStudent.length >= 2 &&
            filterStudent.map((student: any, id: number) => (
              
              <Link
                href={`/dashboard/students/${student._id}`}
                key={id}
                className="flex items-center gap-3 w-full px-5 py-3 border cursor-pointer hover:bg-accent"
              >
                <Clock10 className=" stroke-1 stroke-gray-500 w-5 h-5" />
                <p className="flex gap-2 items-end text-[13px] text-gray-500 font-medium">
                  {student.surname} {student.name}
                  <span className="text-orange-300/60 text-[12px]">
                    ({student.courseTitle})
                  </span>
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

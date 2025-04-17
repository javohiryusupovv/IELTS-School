"use client"

import { ActiveStudent } from "@/actions/student.action";
import { Button } from "@/components/ui/button";
import { IStudent } from "@/types/type";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import studentImage from "../../../../../../public/img/student.png"
import Image from "next/image";
import { BsCoin } from "react-icons/bs";
import EditStudent from "./editStudent";
import { UserCog } from 'lucide-react'


import Archive from "./Archive";
import ActiveStudentFunc from "./ActiveStudent";

interface Props {
  student: IStudent;
}

export default function Actions({ student }: Props) {

  const pathname = usePathname()

  const ActiveStudentHande = (isActive: boolean) => {
    const promise = ActiveStudent(student._id, isActive, pathname);

    toast.promise(promise, {
      loading: "Yuklanmoqda...",
      success: "Success updated !",
      error: "Error updated !"
    })
  }
  const totalCoins = student?.coins?.reduce((sum: number, coin: any) => sum + coin.value, 0) ?? 0;


  return (
    <div>
      <div className="grid grid-cols-3 items-start gap-5 mb-4">
        <div className=" relative top-0 right-0 col-span-1 px-4 py-5 rounded-md shadowCustom">
          <div className="absolute top-5 right-3 flex flex-col items-center gap-2">
            <EditStudent student={student} />
            <ActiveStudentFunc ActiveStudentHande={ActiveStudentHande} />
            <Archive ActiveStudentHande={ActiveStudentHande} />
          </div>
          <div>
            <article className="flex justify-center items-center w-[80px] h-[80px] border rounded-full bg-gray-400/40 mb-10">
              <Image width={50} src={studentImage} alt="Student Profile" />
            </article>
            <h6 className="mb-2 text-[25px] font-medium">{student.surname} {student.name}</h6>
            <p className="mb-4 flex items-center gap-2">Studentid: <span className="px-2 text-[14px] rounded-full text-white bg-yellow-500">{student.studentID}</span></p>
            <article className="flex items-center gap-[5px] mb-4">
              <BsCoin className=" fill-yellow-500 w-[15px] h-[15px]" />
              <ul className="flex items-end gap-[5px]">
                <li className="text-[18px] font-medium">{totalCoins}</li>
                <li className="text-[14px] text-gray-600/65">coins</li>
              </ul>
            </article>
            <ul>
              <li className="mb-1 text-[15px] text-gray-500/50">Telefon:</li>
              <li className="text-[15px] text-orange-500">{student.phone}</li>
            </ul>
          </div>
        </div>
        <div className="text-center col-span-2 h-[200px] rounded-lg shadowCustom">
          <p>Studentning Coinlar tarixi</p>
        </div>
      </div>
    </div>
  )
}

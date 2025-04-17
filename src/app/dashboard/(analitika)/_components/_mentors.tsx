import Image from "next/image";
import Popular from "../../../../../public/icons/mentorPoular.png"
import { ArrowDown } from 'lucide-react';
import Mentors from "../../../../../public/icons/Mentorlar.png"

export default function _mentors() {
  return (
    <div className="px-4 pt-3 bg-[#FFFBE6] rounded-[8px]">
        <article className="flex items-center gap-4 mb-4">
            <button className="bg-[#FADB14] p-2 rounded-md ">
                <Image width={30} src={Popular} alt="Icons Mentors" />
            </button>
            <p className="text-[20px] font-semibold">Mentorlar</p>
        </article>
        <div className=" relative flex items-start  justify-between">
            <article className="flex items-center gap-3">
                <ArrowDown className="text-red-600 w-5 h-5" />
                <h6 className="text-[35px] font-bold">36</h6>
            </article>
            <Image  width={200} src={Mentors} alt="Mentors background img" />
        </div>
    </div>
  )
}

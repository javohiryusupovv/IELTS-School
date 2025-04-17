import { ArrowDown } from "lucide-react";
import Image from "next/image";
import students from "../../../../../public/icons/popular.png"
import bgImg from "../../../../../public/icons/talabalaricons.png"


export default function _students() {
  return (
    <div className="px-4 pt-3  bg-[#F6FFED] rounded-[8px]">
        <article className="flex items-center gap-4 mb-4">
            <button className="bg-[#52C41A] p-2 rounded-md ">
                <Image width={30} src={students} alt="Icons Mentors" />
            </button>
            <p className="text-[20px] font-semibold">Talabalar</p>
        </article>
        <div className="relative flex items-start  justify-between">
            <article className="flex items-center gap-3">
                <ArrowDown className="text-green-500 w-5 h-5 rotate-180" />
                <h6 className="text-[35px] font-bold">285</h6>
            </article>
            <Image  width={200} src={bgImg} alt="Mentors background img" />
        </div>
    </div>
  )
}

import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Filiallar from "../../../../../public/icons/filiallar.png"
import bino from "../../../../../public/icons/bino.png"

export default function _filiallar() {
  return (
    <div className="px-4 pt-3 bg-[#E6F7FF] rounded-[8px]">
        <article className="flex items-center gap-4 mb-4">
            <button className="bg-[#1890FF] p-2 rounded-md ">
                <Image width={30} src={bino} alt="Icons Mentors" />
            </button>
            <p className="text-[20px] font-semibold">Filiallar</p>
        </article>
        <div className=" relative flex items-start  justify-between">
            <article className="flex items-center gap-3">
                <p className="text-[30px] text-gray-300 font-semibold">=</p>
                <h6 className="text-[35px] font-bold">0</h6>
            </article>
            <Image  width={200} src={Filiallar} alt="Mentors background img" />
        </div>
    </div>
  )
}

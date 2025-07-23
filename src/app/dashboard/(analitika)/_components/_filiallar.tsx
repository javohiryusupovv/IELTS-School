import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Filiallar from "../../../../../public/icons/filiallar.png";
import bino from "../../../../../public/icons/bino.png";

export default function _filiallar() {
  return (
    <div className="px-4 pt-3 bg-[#E6F7FF] rounded-[8px]">
      <article className="flex items-center gap-4 mb-4">
        <button className="bg-[#1890FF] p-2 rounded-md max-md:p-1 ">
          <Image
            width={30}
            className="max-md:w-7 max-sm:w-6"
            src={bino}
            alt="Icons Mentors"
          />
        </button>
        <p className="text-[20px] font-semibold max-lg:text-[18px] max-md:text-[17px] max-sm:text-[15px]">
          Filiallar
        </p>
      </article>
      <div className=" relative flex items-start  justify-between">
        <article className="flex items-center gap-3">
          <p className="text-[30px] text-gray-300 font-semibold">=</p>
          <h6 className="text-[35px] max-lg:text-[30px] max-md:text-[25px] max-sm:text-[22px] font-bold">
            0
          </h6>
        </article>
        <Image
          width={200}
          className="max-lg:w-[150px] max-md:w-[110px] max-sm:w-[180px]"
          src={Filiallar}
          alt="Mentors background img"
        />
      </div>
    </div>
  );
}

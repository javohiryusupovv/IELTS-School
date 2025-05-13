import Image from "next/image";
import Popular from "../../../../../public/icons/mentorPoular.png";
import { ArrowDown } from "lucide-react";
import Mentors from "../../../../../public/icons/Mentorlar.png";
import { ITeacher } from "@/types/type";

interface Props {
  getTeacher: ITeacher[];
}

export default function _mentors({ getTeacher }: Props) {
  return (
    <div className="px-4 pt-3 bg-[#FFFBE6] rounded-[8px]">
      <article className="flex items-center gap-4 mb-4">
        <button className="bg-[#FADB14] p-2 rounded-md max-md:p-1 ">
          <Image
            width={30}
            className="max-md:w-7 max-sm:w-6"
            src={Popular}
            alt="Icons Mentors"
          />
        </button>
        <p className="text-[20px] font-semibold max-lg:text-[18px] max-md:text-[17px] max-sm:text-[15px]">
          Mentorlar
        </p>
      </article>
      <div className=" relative flex items-start  justify-between">
        <article className="flex items-center gap-3">
          <ArrowDown
            className={`w-5 h-5 ${
              getTeacher.length >= 10
                ? "text-green-500 rotate-180"
                : "text-red-600 rotate-0"
            }`}
          />
          <h6 className="text-[35px] font-bold max-lg:text-[30px] max-md:text-[25px] max-sm:text-[22px]">
            {getTeacher.length}
          </h6>
        </article>
        <Image
          className="max-lg:w-[150px] max-md:w-[110px] max-sm:w-[90px]"
          width={200}
          src={Mentors}
          alt="Mentors background img"
        />
      </div>
    </div>
  );
}

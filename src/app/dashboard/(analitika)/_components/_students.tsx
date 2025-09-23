import { ArrowDown } from "lucide-react";
import Image from "next/image";
import students from "../../../../../public/icons/popular.png";
import bgImg from "../../../../../public/icons/talabalaricons.png";
import { IStudent } from "@/types/type";

interface Props {
  getStudentsValue: any;
}

export default function _students({ getStudentsValue }: Props) {
  return (
    <div className="px-4 pt-3  bg-[#F6FFED] rounded-[8px] overflow-hidden">
      <article className="flex items-center gap-4 mb-4">
        <button className="bg-[#52C41A] p-2 rounded-md max-md:p-1">
          <Image
            width={30}
            className="max-md:w-7 max-sm:w-6"
            src={students}
            alt="Icons Mentors"
          />
        </button>
        <p className="text-[20px] font-semibold max-lg:text-[18px] max-md:text-[17px] max-sm:text-[15px]">
          Talabalar
        </p>
      </article>
      <div className="relative flex items-start  justify-between">
        <article className="flex items-center gap-3">
          <ArrowDown
            className={`w-5 h-5 ${
              getStudentsValue.length >= 100
                ? "text-green-500 rotate-180"
                : "text-red-600 rotate-0"
            }`}
          />
          <h6 className="text-[35px] font-bold max-lg:text-[30px] max-md:text-[25px] max-sm:text-[22px]">
            {getStudentsValue.length}
          </h6>
        </article>
        <Image
          className="max-lg:w-[150px] max-md:w-[110px] max-sm:w-[180px]"
          width={200}
          src={bgImg}
          alt="Mentors background img"
        />
      </div>
    </div>
  );
}

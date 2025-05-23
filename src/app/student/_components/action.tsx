import { LaptopMinimalCheck, ChevronRight, Banknote, CircleGauge  } from "lucide-react";
import Link from "next/link";


export default function MenyuCoin() {
  return (
    <div className="flex flex-col gap-3">
      <Link href={`/student/history/coinsucces`} className="group w-full flex justify-between items-center px-4 py-2 border rounded-md cursor-pointer bg-accent active:bg-green-500/0 active:text-white">
        <article className="flex items-center gap-2 text-[13px]">
          <LaptopMinimalCheck className="stroke-green-500 group-active:stroke-white" /> Qabul qilingan
          Coinlar
        </article>
        <span>
          <ChevronRight className="group-hover:stroke-green-500 group-active:stroke-white group-hover:translate-x-1 transition-all duration-200 stroke-1 w-5 h-5" />
        </span>
      </Link>
      <Link href={`/student/history/jarima`} className="group w-full flex justify-between items-center px-4 py-2 border rounded-md cursor-pointer bg-accent active:bg-red-500/50 active:text-white">
        <article className="flex items-center gap-2 text-[13px]">
          <Banknote className="stroke-red-600 group-active:stroke-white" /> Jarimalar
        </article>
        <span>
          <ChevronRight className="group-hover:stroke-red-500 group-active:stroke-white group-hover:translate-x-1 transition-all duration-200 stroke-1 w-5 h-5" />
        </span>
      </Link>
      <Link href={`/student/history/coinspend`} className="group w-full flex justify-between items-center px-4 py-2 border rounded-md cursor-pointer bg-accent active:bg-orange-500/50 active:text-white">
        <article className="flex items-center gap-2 text-[13px]">
          <CircleGauge className="stroke-orange-500 group-active:stroke-white" />Sarflangan Coinlar
        </article>
        <span>
          <ChevronRight className="group-hover:stroke-orange-500 group-active:stroke-white group-hover:translate-x-1 transition-all duration-200 stroke-1 w-5 h-5" />
        </span>
      </Link>
    </div>
  );
}

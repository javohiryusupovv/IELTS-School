import { ChevronRight } from "lucide-react";
import { RxDashboard } from "react-icons/rx";
import {
  GraduationCap,
  Users,
  ShoppingBag,
  Store,
  UserRound,
} from "lucide-react";
import { TbShoppingCartPlus } from "react-icons/tb";
import { BsClockHistory } from "react-icons/bs";
import Link from "next/link";

export default function NavbarMedia() {
  return (
    <div className="relative left-0 top-0 w-full">
      <button className="mx-2 p-[2px] rounded border-[0.5px] cursor-pointer">
        <ChevronRight className="stroke-1 w-6 h-6" />
      </button>
      <div className="absolute left-0 -top-4 w-full py-1.5 px-2 shadowMedia">
        <ul className="flex justify-between items-center">
          <li className="w-[80px] group cursor-pointer px-2 py-2 rounded-sm bg-white">
            <Link href={`/dashboard`} className="flex items-center justify-center flex-col text-center">
              <RxDashboard className="text-[20px] w-6 h-6 flex justify-center items-center group-hover:text-orange-500" />
                <span className="text-[12px] text-black group-hover:text-orange-500">Dashboard</span>
            </Link>
          </li>
          <li className="w-[80px] group cursor-pointer px-2 py-2 rounded-sm bg-white">
            <Link href={"/dashboard/teacher"} className="flex items-center justify-center flex-col text-center">
              <UserRound className="text-[20px] w-6 h-6 flex justify-center items-center group-hover:text-orange-500" />
                <span className="text-[12px] text-black group-hover:text-orange-500">O'qituvchilar</span>
            </Link>
          </li>
          <li className="w-[80px] group cursor-pointer px-2 py-2 rounded-sm bg-white">
            <Link href={"/dashboard/courses"} className="flex items-center justify-center flex-col text-center">
              <GraduationCap className="text-[20px] w-6 h-6 flex justify-center items-center group-hover:text-orange-500" />
                <span className="text-[12px] text-black group-hover:text-orange-500">Kurslar</span>
            </Link>
          </li>
          <li className="w-[80px] group cursor-pointer px-2 py-2 rounded-sm bg-white">
            <Link href={"/dashboard/students"} className="flex items-center justify-center flex-col text-center">
              <Users className="text-[20px] w-6 h-6 flex justify-center items-center group-hover:text-orange-500" />
                <span className="text-[12px] text-black group-hover:text-orange-500">O'quvchilar</span>
            </Link>
          </li>
          <li className="w-[80px] group cursor-pointer px-2 py-2 rounded-sm bg-white">
            <Link href={"/dashboard/shop"} className="flex items-center justify-center flex-col text-center">
              <TbShoppingCartPlus className="text-[20px] w-6 h-6 flex justify-center items-center group-hover:text-orange-500" />
                <span className="text-[12px] text-black group-hover:text-orange-500">Magazin</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

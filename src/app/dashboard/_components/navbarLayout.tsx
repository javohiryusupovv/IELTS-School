"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";



import Logo from "../../../../public/icons/logod.png";
import Bank from "../../../../public/icons/bank.svg";
import { RxDashboard } from "react-icons/rx";
import { GraduationCap, Users, ShoppingBag, Store  } from "lucide-react";
import { BsCoin } from "react-icons/bs";
import { UserRound } from "lucide-react";
import { TbShoppingCartPlus } from "react-icons/tb";
import { BsClockHistory } from "react-icons/bs";


function NavbarLayout() {
  const pathnames = usePathname();
  const [select, setSelect] = useState(false)

  return (
    <aside className="py-2 px-3 sticky top-0 z-[10] w-[230px] h-screen overflow-y-auto scrolbars">
      <div className="w-full border shadow-md rounded-lg pb-20">
        <article className="pt-3 mx-3 border-b pb-4 mb-16">
          <Image src={Logo} alt="Logo" />
        </article>
        <ul className="mb-16">
          <li>
            <Link
              href={"/dashboard"}
              className={`group flex items-center gap-2 py-5 px-2 border-b hover:bg-orange-300 hover:text-white cursor-pointer transition-all duration-200 ${
                pathnames === "/dashboard" ? "bg-orange-400 text-white" : ""
              }`}
            >
              <RxDashboard className="text-[25px] flex justify-center items-center group-hover:stroke-white duration-0" />{" "}
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href={"/dashboard/teacher"}
              className={`group flex items-center gap-2 py-5 px-2 border-b hover:bg-orange-300 hover:text-white cursor-pointer transition-all duration-200 ${
                pathnames === "/dashboard/teacher"
                  ? "bg-orange-400 text-white"
                  : ""
              }`}
            >
              <UserRound className="text-[30px] flex justify-center items-center group-hover:stroke-white duration-0" />{" "}
              Teacher
            </Link>
          </li>
          <li>
            <Link
              href={"/dashboard/courses"}
              className={`group flex items-center gap-2 py-5 px-2 border-b hover:bg-orange-300 hover:text-white cursor-pointer transition-all duration-200 ${
                pathnames === "/dashboard/courses"
                  ? "bg-orange-400 text-white"
                  : ""
              }`}
            >
              <GraduationCap className="text-[30px] flex justify-center items-center group-hover:stroke-white duration-0" />{" "}
              Course
            </Link>
          </li>
          <li>
            <Link
              href={"/dashboard/students"}
              className={`group flex items-center gap-2 py-5 px-2 border-b hover:bg-orange-300 hover:text-white cursor-pointer transition-all duration-200 ${
                pathnames === "/dashboard/students"
                  ? "bg-orange-400 text-white"
                  : ""
              }`}
            >
              <Users className="text-[30px] flex justify-center items-center group-hover:stroke-white duration-0" />{" "}
              Student
            </Link>
          </li>
          <li className="overflow-hidden" onMouseEnter={() => setSelect(true)} onMouseLeave={() => setSelect(false)}>
            <Link
              href={"/dashboard/shop"} 
              className={` relative top-0 left-0 group flex items-center gap-2 py-5 px-2 border-b hover:bg-orange-300 hover:text-white cursor-pointer transition-all duration-200  ${ pathnames === "/dashboard/shop"? "bg-orange-400 text-white" : ""}`}>
              <Store className="text-[27px] flex justify-center items-center group-hover:stroke-white duration-0" />
                Shop
            </Link>
            <article className={`w-full transition-all duration-300 ${select ? "h-[90px] opacity-100 mt-2" : "h-0 opacity-0"} ml-5`}>
              <Link href={`/dashboard/shop/addproducts`} className="py-2 px-2 flex items-center gap-2 mb-2 hover:bg-accent">
                <TbShoppingCartPlus className="w-5 h-5"/>
                Mahsulot yaratish
              </Link>
              <hr />
              <Link href={`/dashboard/shop/history`} className="py-2 px-2 flex items-center gap-2 hover:bg-accent">
                <BsClockHistory className="w-5 h-5"/>
                Mahsulot tarixi
              </Link>
            </article>
          </li>
          <li>
            <Link
              href={"/dashboard/orders"}
              className={`group flex items-center gap-2 py-5 px-2 border-b hover:bg-orange-300 hover:text-white cursor-pointer transition-all duration-200 ${
                pathnames === "/dashboard/orders"
                  ? "bg-orange-400 text-white"
                  : ""
              }`}
            >
              <ShoppingBag className="text-[27px] flex justify-center items-center group-hover:stroke-white duration-0" />{" "}
              Orders
            </Link>
          </li>
        </ul>
        <div className="bg-yellow-500 flex flex-col items-center rounded-xl pb-3 mx-2 px-5">
          <Image
            className="mb-3 drop-shadow-2xl shadow-red-500"
            width={150}
            src={Bank}
            alt="Bank"
          />
          <p className="text-[18px] font-semibold mb-3 text-white">
            Shoppinga o&apos;tish
          </p>
          <button className="py-[6px] px-7 border rounded-lg font-semibold text-white">
            <Link href={"/shop"}>Kettik</Link>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default NavbarLayout;

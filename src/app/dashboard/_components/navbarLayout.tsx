"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./navbar.css"



import Logo from "../../../../public/icons/logod.png";
import Bank from "../../../../public/icons/bank.svg";
import { RxDashboard } from "react-icons/rx";
import { GraduationCap, Users, ShoppingBag, Store, UserRound, ChevronRight } from "lucide-react";
import { TbShoppingCartPlus } from "react-icons/tb";
import { BsClockHistory } from "react-icons/bs";


function NavbarLayout() {
  const pathnames = usePathname();
  const [select, setSelect] = useState(false)
  const [isSideBar, setSideBar] = useState(true)

  const handleActiveSidebar = () => {
    setSideBar(!isSideBar)
  }

  return (
    <div>
      <aside className={`${isSideBar ? "sm:block hidden" : "block"} py-2 md:px-3 px-0 sticky top-0 z-[10] lg:w-[230px] sm:w-[180px] w-[120px] h-screen sm:overflow-y-auto sm:ml-2 ml-0 scrolbars`}>
        <div className={`absolute ${isSideBar ? "sm:left-0 -left-[100%]" : "left-0"} transition-all duration-500 w-full border bg-white rounded-lg pb-20`}>
          <Link href={"/dashboard"} className="flex pt-7 mx-4 border-b pb-10 mb-10">
            <Image className="w-[120px]" src={Logo} alt="Logo" />
          </Link>
          <ul className="mb-16">
            <li>
              <Link
                href={"/dashboard"}
                className={`group flex sm:justify-start justify-center items-center gap-2 py-5 px-2 border-b hover:bg-orange-300 hover:text-white cursor-pointer transition-all duration-200 ${pathnames === "/dashboard" ? "bg-orange-400 text-white" : ""
                  }`}
              >
                <RxDashboard className="text-[25px] flex justify-center items-center group-hover:stroke-white duration-0" />{" "}
                <span className="sm:inline-flex hidden">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/teacher"}
                className={`group flex sm:justify-start justify-center items-center gap-2 py-5 px-2 border-b hover:bg-orange-300 hover:text-white cursor-pointer transition-all duration-200 ${pathnames === "/dashboard/teacher"
                  ? "bg-orange-400 text-white"
                  : ""
                  }`}
              >
                <UserRound className="flex justify-center items-center group-hover:stroke-white duration-0" />{" "}
                <span className="sm:inline-flex hidden">O'qituvchilar</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/courses"}
                className={`group flex sm:justify-start justify-center items-center gap-2 py-5 px-2 border-b hover:bg-orange-300 hover:text-white cursor-pointer transition-all duration-200 ${pathnames === "/dashboard/courses"
                  ? "bg-orange-400 text-white"
                  : ""
                  }`}
              >
                <GraduationCap className="flex justify-center items-center group-hover:stroke-white duration-0" />{" "}
                <span className="sm:inline-flex hidden">Kurslar</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/students"}
                className={`group flex sm:justify-start justify-center items-center gap-2 py-5 px-2 border-b hover:bg-orange-300 hover:text-white cursor-pointer transition-all duration-200 ${pathnames === "/dashboard/students"
                  ? "bg-orange-400 text-white"
                  : ""
                  }`}
              >
                <Users className="flex justify-center items-center group-hover:stroke-white duration-0" />{" "}
                <span className="sm:inline-flex hidden">O'quvchilar</span>
              </Link>
            </li>
            <li className="overflow-hidden" onMouseEnter={() => setSelect(true)} onMouseLeave={() => setSelect(false)}>
              <Link
                href={"/dashboard/shop"}
                className={` relative top-0 left-0 group flex sm:justify-start justify-center items-center gap-2 py-5 px-2 border-b hover:bg-orange-300 hover:text-white cursor-pointer transition-all duration-200  ${pathnames === "/dashboard/shop" ? "bg-orange-400 text-white" : ""}`}>
                <Store className="flex justify-center items-center group-hover:stroke-white duration-0" />
                <span className="sm:inline-flex hidden">Magazin</span>
              </Link>
              <article className={`w-full transition-all duration-300 ${select ? "h-[90px] opacity-100 mt-2" : "h-0 opacity-0"} ml-5`}>
                <Link href={`/dashboard/shop/addproducts`} className="py-2 px-2 flex  sm:justify-start justify-centeritems-center gap-2 mb-2 hover:bg-accent">
                  <TbShoppingCartPlus className="w-5 h-5" />
                  <span className="sm:inline-flex hidden">Mahsulot yaratish</span>
                </Link>
                <hr />
                <Link href={`/dashboard/shop/history`} className="py-2 px-2 flex sm:justify-start justify-center items-center gap-2 hover:bg-accent">
                  <BsClockHistory className="w-5 h-5" />
                  <span className="sm:inline-flex hidden">Mahsulot tarixi</span>
                </Link>
              </article>
            </li>
            <li>
              <Link
                href={"/dashboard/orders"}
                className={`group flex sm:justify-start justify-center items-center gap-2 py-5 px-2 border-b hover:bg-orange-300 hover:text-white cursor-pointer transition-all duration-200 ${pathnames === "/dashboard/orders"
                  ? "bg-orange-400 text-white"
                  : ""
                  }`}
              >
                <ShoppingBag className="flex justify-center items-center group-hover:stroke-white duration-0" />{" "}
                <span className="sm:inline-flex hidden">Mahsulot Tarixi</span>
              </Link>
            </li>
          </ul>
          <div className="bg-yellow-500 sm:flex hidden flex-col items-center rounded-xl pb-3 mx-2 px-5">
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
              <Link href={""}>Shop</Link>
            </button>
          </div>
        </div>
      </aside>
      <button onClick={handleActiveSidebar} className={`${isSideBar ? "fixed left-[0%]" : "left-0"} transition-all duration-300 sm:hidden fixed z-[999] top-24 left-24 flex justify-center items-center w-[30px] h-[30px] rounded-md border shadow-gray-500 bg-white`}>
        <ChevronRight className=" stroke-[#8A98A7]" />
      </button>
    </div>
  );
}

export default NavbarLayout;

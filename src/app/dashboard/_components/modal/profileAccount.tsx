"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ModalConfirm from "@/components/custom/modalConfirm";
import { useState } from "react";

import { BiSupport } from "react-icons/bi";
import Link from "next/link";
import EditProfile from "./editProfile";
import { RiRobot2Line } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
import { IAdministrator } from "../../../../../app.types";

interface Props {
  admin: IAdministrator;
}

export default function ProfileAccount({ admin }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  
  
  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <article className="flex justify-center cursor-pointer items-center border w-[45px] h-[45px] rounded-full overflow-hidden ">
            <RiRobot2Line className="w-[25px] h-[25px]" />
          </article>
        </PopoverTrigger>
        <PopoverContent className="sm:w-[350px] absolute sm:right-2 right-0">
          <div>
            <article className="flex items-center justify-between mb-2">
              <article className="flex items-center gap-3">
                <article className="flex justify-center cursor-pointer items-center border w-[45px] h-[45px] rounded-full overflow-hidden ">
                  <RiRobot2Line className="w-[25px] h-[25px]" />
                </article>
                <article>
                  <p className="sm:text-[16px] text-[13px] font-medium max-sm:flex-col max-sm:items-start max-sm:gap-0 flex items-center gap-1">
                    {admin.fullname} -
                    <span className="text-green-500 sm:text-[12px] text-[10px] font-normal underline">
                      ({admin.role})
                    </span>
                  </p>
                  <span className="text-[13px] text-green-500">
                    +998 {admin.phone}
                  </span>
                </article>
              </article>
              <EditProfile />
            </article>
            <hr className="mb-3" />
            <div className="flex flex-col gap-3">
              <Link href={"/dashboard/price"} onClick={() => handleClose()}>
                <button className="flex gap-2 items-center transition-all duration-200 text-[#72e128] w-full sm:py-2 py-1.5 px-4 rounded border hover:bg-[#72e128c2]/20 hover:border-transparent">
                  <BsCashCoin />
                  <p>To'lov qilish</p>
                </button>
              </Link>
              {(admin.role === "owner" || admin.role === "coinx") && (
                <Link href={`/crm`}>
                  <button className="flex gap-2 mb-3 items-center transition-all duration-200 w-full sm:py-2 py-1.5 px-4 rounded border bg-orange-500 text-white hover:border-transparent">
                    <p>AdminPage</p>
                  </button>
                </Link>
              )}
              {admin.role === "administrator" && (
                <Link href={"https://t.me/Javoxir_iq"} target="_blank">
                  <button className="group hover:bg-orange-500 transition-all duration-200 cursor-pointer flex text-white items-center gap-2 w-full sm:py-2 py-1.5 px-4 rounded bg-orange-400/60 mb-3">
                    <BiSupport className="w-5 h-5 text-white transition-all duration-200" />
                    <p className="transition-all duration-200">
                      Yordam markazi
                    </p>
                  </button>
                </Link>
              )}
            </div>
            <div>
              <ModalConfirm handleClose={handleClose} />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

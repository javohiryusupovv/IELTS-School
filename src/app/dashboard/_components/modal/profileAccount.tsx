"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import adminImg from "../../../../../public/accountImg/azizbek.jpg";
import Image from "next/image";
import ModalConfirm from "@/components/custom/modalConfirm";
import { useState } from "react";

import { BiSupport } from "react-icons/bi";
import Link from "next/link";
import EditProfile from "./editProfile";

export default function ProfileAccount() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <article className="w-[50px] h-[50px] rounded-full overflow-hidden ">
            <Image
              className="w-full h-full cursor-pointer"
              src={adminImg}
              alt="Admins Img"
            />
          </article>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] absolute right-2">
          <div>
            <article className="flex items-center justify-between mb-2">
              <article className="flex items-center gap-3">
                <Image
                  className="w-[50px] h-[50px] rounded-full cursor-pointer"
                  src={adminImg}
                  alt="Admins Img"
                />
                <article>
                  <p className="text-[16px] font-medium">Qayumov Azizbek</p>
                  <span className="text-[13px] text-green-500">
                    +998 (90)-070-02-51
                  </span>
                </article>
              </article>
                <EditProfile/>
            </article>
            <hr className="mb-3" />
            <Link href={"https://t.me/Javoxir_iq"} target="_blank">
              <button className="group hover:bg-orange-500 transition-all duration-200 cursor-pointer flex text-white items-center gap-2 w-full py-2 px-4 rounded bg-orange-400/60 mb-3">
                <BiSupport className="w-5 h-5 text-white transition-all duration-200" />
                <p className="transition-all duration-200">Yordam markazi</p>
              </button>
            </Link>
            <div>
              <ModalConfirm handleClose={handleClose} />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

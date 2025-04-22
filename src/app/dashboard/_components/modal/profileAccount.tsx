"use client"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import adminImg from "../../../../../public/accountImg/azizbek.jpg"
import Image from "next/image"
import { FilePenLine } from 'lucide-react';
import ModalConfirm from "@/components/custom/modalConfirm";
import { useState } from "react";



export default function ProfileAccount() {
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => {
        setIsOpen(false)
    }
    return (
        <div>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <article className="w-[50px] h-[50px] rounded-full overflow-hidden ">
                        <Image className="w-full h-full cursor-pointer" src={adminImg} alt="Admins Img" />
                    </article>
                </PopoverTrigger>
                <PopoverContent className="w-[350px] absolute right-2">
                    <div>
                        <article className="flex items-center justify-between mb-2">
                            <article className="flex items-center gap-3">
                                <Image className="w-[50px] h-[50px] rounded-full cursor-pointer" src={adminImg} alt="Admins Img" />
                                <article>
                                    <p className="text-[16px] font-medium">Qayumov Azizbek</p>
                                    <span className="text-[13px] text-green-500">+998 (90)-070-02-51</span>
                                </article>
                            </article>
                            <button className="group relative top-0 left-0"><FilePenLine className="group-hover:stroke-orange-500 transition-all duration-200 stroke-[1.4] w-[20px] h-[20px]"/> <p className=" absolute -top-7 -left-6 rounded-sm px-2 py-1 text-[10px] border text-orange-600 border-orange-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">Tahrirlash</p></button>
                        </article>
                        <hr className="mb-3"/>
                        <div>
                            <ModalConfirm handleClose={handleClose} />
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

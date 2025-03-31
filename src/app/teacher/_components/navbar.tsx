"use client"

import Image from "next/image"
import LearningCenterLogo from "../../../../public/icons/ustozDev.png"
import GroupCard from "./card/group-card"
import { ArrowRightToLine } from 'lucide-react';
import { useState } from "react";
import Link from "next/link";



function NavbarTeacher() {
  return (
    <>
        <div className={`fixed left-0 top-0 w-[130px] h-screen border scrolbars transition-all duration-500 bg-white shadow-md`}>
            <nav>
                <Link href={"/dashboard"} className="flex items-center py-5 ml-4">
                    <Image width={100} src={LearningCenterLogo} alt="UstozDev" />
                </Link>
                <ArrowRightToLine className={`w-[30px] h-[30px] absolute -right-3 top-14 p-[5px] border rounded-full cursor-pointer stroke-white bg-[#fdb61b]`}/>
                <p className="mb-14 w-full h-[1px] bg-[#80808062]"></p>
                <GroupCard/>
            </nav>
        </div>
    </>
  )
}

export default NavbarTeacher
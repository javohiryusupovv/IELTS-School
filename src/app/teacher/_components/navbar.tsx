"use client";

import Image from "next/image";
import LearningCenterLogo from "../../../../public/logo/logo.png";
import GroupCard from "./card/group-card";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { ITeacher } from "@/types/type";
import Logout from "@/app/(auth)/logout/page";
import SheetDemo from "./sheet";

function NavbarTeacher() {
  const [teacher, setTeacher] = useState<ITeacher | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedTeacher = localStorage.getItem("teacher");
    if (storedTeacher) {
      setTeacher(JSON.parse(storedTeacher));
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <Loading />; 
  }

  if (!teacher) {
    return <p>Login qilingan teacher topilmadi.</p>;
  }

  return (
    <div className="relative top-0 left-0 ">
      <div
        className={`fixed left-0 top-0 z-20 flex justify-between w-[150px] h-screen scrolbars overflow-y-auto bg-white shadow-md max-sm:hidden`}
      >
        <nav className="w-full">
          <Link
            href={"/teacher"}
            className="fixed top-0 bg-white flex items-center p-[24.5px] mb-14 shadow-sm"
          >
            <Image width={100} src={LearningCenterLogo} alt="UstozDev" />
          </Link>
          <GroupCard teacher={teacher} />
        </nav>
        <div className="fixed bottom-0 w-[148px] flex flex-col items-center gap-4 py-5 px-[13.5px] bg-white border-t">
          <article className="px-1 py-2 flex flex-col gap-2 items-center justify-center">
            <CircleUserRound className="stroke-[0.9] w-7 h-7" />
            <p className="text-[15px] font-light text-center">
              {teacher?.teacherName} {teacher?.teacherSurname.slice(0, 1)}
            </p>
          </article>
          <Logout />
        </div>
      </div>

      <div className="relative sm:hidden">
        <div className="absolute -top-4 py-5">
          <ul className="flex items-center justify-between w-screen pr-5">
            <li className="cursor-pointer px-2 py-2">
              <Link href={"/teacher"} className="p-60">
                <Image width={100} src={LearningCenterLogo} alt="UstozDev" />
              </Link>
            </li>
            <li className="flex gap-3 items-center justify-between">
              <SheetDemo />
              <Logout />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavbarTeacher;

"use client";

import { Button } from "@/components/ui/button";
import { FaGripLines } from "react-icons/fa6";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import GroupCard from "./card/group-card";
import { useEffect, useState } from "react";
import { ITeacher } from "@/types/type";
import Loading from "./loading";

export default function SheetDemo() {
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
    return (
      <p className="text-center text-sm text-red-500 font-medium">
        Login qilingan teacher topilmadi.
      </p>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <FaGripLines className="w-5 h-5 text-gray-700 hover:text-black transition" />
      </SheetTrigger>
      <SheetContent className="w-[150px] px-0">
        <SheetHeader className="shadow-sm">
          <SheetTitle className="flex items-center py-3 rounded-md mt-3 justify-center sm:text-[18px] text-[16px]">
            Kurslar
          </SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto max-h-[calc(100vh-100px)] px-4 py-4">
          <GroupCard teacher={teacher} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

"use client";

import { User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  students: { name: string; surname: string }[];
}

export default function EctraCoin({ students }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 text-white">Qo'shimcha coin</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Odob axloq uchun coin</DialogTitle>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-auto space-y-2 mt-2">
          {students.length === 0 ? (
            <p>Hozircha talabalar yo‘q</p>
          ) : (
            students.map((student, id) => (
              <div key={id} className="flex items-center justify-between">
                <div className="flex items-center gap-2 pr-10">
                  <User className="w-4 h-4 stroke-[1.2]" />
                  <p className="text-[14px]">
                    {student.surname} {student.name}
                  </p>
                </div>
                <div className="flex items-center max-w-min ">
                  <input
                    type="number"
                    className="w-[36px] px-1 peer border rounded outline-none focus:border-orange-500 transition-all duration-200 mr-4"
                  />
                  <span className="mr-4">coin</span>
                </div>
              </div>
            ))
          )}
        </div>
        <DialogFooter>
          <button className="bg-green-700 px-6 py-2 rounded-lg text-white">Saqlash</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

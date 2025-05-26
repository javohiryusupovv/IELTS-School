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
        <Button className="bg-orange-500 text-white">
          O'quvchilar ro'yxati
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
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
                <input type="checkbox" className="mr-4" />
              </div>
            ))
          )}
          
        </div>
        <DialogFooter>
          <Button variant="outline">Yopish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

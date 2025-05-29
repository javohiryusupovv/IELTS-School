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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { addTeacherBonusCoin } from "@/actions/student.action";

interface Student {
  _id: string;
  name: string;
  surname: string;
}

interface Props {
  students: Student[];
}

export default function EctraCoin({ students }: Props) {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [coin, setCoin] = useState<number>(0);
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    if (!selectedStudentId || coin <= 0) return;

    startTransition(() => {
      addTeacherBonusCoin(selectedStudentId, coin, pathname)
        .then(() => {
          // optional: ko'rsatma, tozalash, notifikatsiya
          setCoin(0);
          setSelectedStudentId(null);
        })
        .catch((error) => {
          console.error("Xatolik:", error.message);
        });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 text-white">Imtihon uchun coin</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Imtihondan yuqori ball olgan o'quvchiga coin qo'shish</DialogTitle>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-auto space-y-2 mt-2">
          {students.length === 0 ? (
            <p>Hozircha talabalar yo'q</p>
          ) : (
            <Select onValueChange={(val) => setSelectedStudentId(val)}>
              <SelectTrigger className="w-[380px]">
                <SelectValue placeholder="O'quvchini tanlang !" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student, id)=> (
                  <SelectItem
                    key={id}
                    value={student._id}
                    className="max-sm:text-[14px] hover:bg-orange-400/70 hover:text-white transition-all duration-200"
                >
                  {student.name} {student.surname}
                </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {selectedStudentId && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={coin}
                  placeholder="Coin miqdori ?"
                  onChange={(e) => setCoin(parseInt(e.target.value) || 0)}
                  className="border px-2 py-1 rounded w-[200px] outline-none focus:border-orange-500"
                />
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <button onClick={handleSave} disabled={isPending} className="bg-green-700 px-6 py-2 rounded-lg text-white">Saqlash</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

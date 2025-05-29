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
import { toast } from "sonner";

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
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async() => {
    setIsOpen(true);
    if (!selectedStudentId) {
      toast.warning("Iltimos, o'quvchini tanlang");
      return;
    }
    if (coin <= 0) {
      toast.warning("Coin miqdori 0 dan katta bo'lishi kerak");
      return;
    }
    try{

      const promise = addTeacherBonusCoin(selectedStudentId, coin, pathname);
      toast.promise(promise, {
        loading: "Coin qo'shilmoqda...",
        success: "Coin muvaffaqiyatli qo'shildi!",
        error: (error) => `Xatolik: ${error.message}`,
      });
      await promise;
      setIsOpen(false);
      setSelectedStudentId(null);
      setCoin(0);
    }catch(error){
      setIsOpen(false);
      throw new Error("Xatolik Coin qo'shishda:" + error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 text-white hover:bg-orange-500/70">Imtihon uchun coin</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px] rounded-md sm:w-full">
        <DialogHeader>
          <DialogTitle className="sm:text-[17px] text-[14px] mt-4">Imtihondan yuqori ball olgan o'quvchiga coin qo'shish</DialogTitle>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-auto space-y-2 mt-2">
          {students.length === 0 ? (
            <p>Hozircha talabalar yo'q</p>
          ) : (
            <Select onValueChange={(val) => setSelectedStudentId(val)}>
              <SelectTrigger className="sm:w-[380px] w-full">
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
                  value={coin || ""}
                  placeholder="Coin miqdori ?"
                  onChange={(e) => setCoin(parseInt(e.target.value))}
                  className="border px-2 py-1 rounded sidebar:w-[200px] w-full outline-none focus:border-orange-500"
                />
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <button onClick={handleSave} className="bg-green-700 px-6 py-2 rounded-lg text-white">Saqlash</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

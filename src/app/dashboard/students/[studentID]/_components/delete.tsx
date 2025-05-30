"use client";

import { deleteCoinHistoryEntry } from "@/actions/student.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "sonner";

interface Props {
  studentId: string;
  coinId: string;
  pathname: string;
}

export default function Delete({ studentId, coinId, pathname }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = async () => {
    const promise = deleteCoinHistoryEntry(studentId, coinId, pathname);
    setIsOpen(true);
    toast.promise(promise, {
      loading: "O'chirilmoqda...",
      success: "Tarixdan muvaffaqiyatli o'chirildi!",
      error: "O'chirishda xatolik yuz berdi",
    });
    await promise;

    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild className="p-1 border border-white rounded-full group hover:bg-red-500">
          <MdOutlineDeleteOutline className="cursor-pointer text-red-700 mr-6 w-7 h-7 transition-all hover:text-white" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Coin uchirasizmi ?</DialogTitle>
            <DialogDescription>
              O'quvchini coinlar tarixini o'chirishni tasdiqlaysizmi?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="destructive"
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md"
            >
              Yo'q
            </Button>
            <Button onClick={handleDelete} className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md">
              Ha
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}

"use client";

import { Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { newAmounProduct } from "@/actions/shop.action";
import { ICreateShop } from "@/types/type";
import { toast } from "sonner";

interface Props {
  products: ICreateShop;
}

export default function EditShop({ products }: Props) {
  const pathname = usePathname();
  const [quantity, setQuantity] = useState(0);
  const [isOpen, setOpen] = useState(false);

  const handleQuantitynewAdd = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!products._id) {
      console.error("Mahsulot ID topilmadi");
      return;
    }
    try {
        setQuantity(quantity);
      const promise = newAmounProduct(products._id, quantity, pathname);
      toast.promise(promise, {
        loading: "Qo'shilmoqda...",
        success: {
          message: "Mahsulot soni qo'shildi",
          duration: 2500,
          style: {
            height: "50px",
            color: "green",
            border: "1px solid #17be5a",
            backgroundColor: "white",
          },
        },
        error: (error) => `Xatolik yuz berdi ${error}`,
      });
      setOpen(false)
    } catch (error) {
      console.log("Topilmadi Mahsulot");
    }
    setQuantity(0)
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger className="group p-2 bg-orange-500/70 hover:bg-orange-600 transition-all duration-300 text-white rounded-md">
        <Settings className="w-4 h-4 group-hover:animate-spin transition-all duration-300" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mahsulot ko'paytirish!</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <article className="flex flex-col">
            <label htmlFor="" className="mb-1 text-[14px]">
              Mahsulot soni ?
            </label>
            <input
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="p-2 border outline-none rounded-md text-[14px]"
              type="text"
              placeholder="namuna: 10"
            />
          </article>
        </div>
        <button
          onClick={handleQuantitynewAdd}
          className="border p-2 w-[100px] rounded-md cursor-pointer bg-orange-500 text-white"
        >
          Saqlash
        </button>
      </DialogContent>
    </Dialog>
  );
}

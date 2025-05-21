"use client";

import { deleteShop } from "@/actions/shop.action";
import { ICreateShop } from "@/types/type";
import { Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  products: ICreateShop;
}

export default function DeleteProduct({ products }: Props) {
  const pathname = usePathname();

  const deleteProduct = async () => {
    if (!products._id) {
      toast.error("Mahsulot ID topilmadi");
      return;
    }
    try {
      const promise = deleteShop(products._id, pathname)
      toast.promise(promise, {
        loading: "O'chirilmoqda...",
        success: {
          message: "Mahsulot o'chirildi",
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
      await promise;
    } catch (error) {
      throw new Error(`Xatolik yuz berid DELETE Shopda ${error}`);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className=" p-2 bg-red-500/70 hover:bg-red-600 transition-all duration-300 text-white rounded-md">
          <Trash className="w-4 h-4 " />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-sm:w-[400px] max-sm:rounded-md max-sidebar:w-[320px]">
        <AlertDialogHeader>
            <AlertDialogTitle className="max-sidebar:text-[15px] leading-4">
            <span className="text-red-500 underline">{products.title}</span>{" "}
            Mahsulotini o'chirishni xoxlaysizmi ?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 text-[14px] max-sidebar:text-[12px]">
            Mahsulotni o'chirish orqali siz barcha ma'lumotlarni o'chirasiz.
            O'chirishni davom ettirishni xohlaysizmi ?
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="max-sm:gap-2">
          <AlertDialogCancel>Yuq</AlertDialogCancel>
          <AlertDialogAction onClick={deleteProduct}>Ha</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

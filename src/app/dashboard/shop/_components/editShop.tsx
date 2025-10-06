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
import { newEditShopProduct } from "@/actions/shop.action";
import { ICreateShop } from "@/types/type";
import { toast } from "sonner";

interface Props {
  products: ICreateShop;
}

export default function EditShop({ products }: Props) {
  const pathname = usePathname();
  const [quantity, setQuantity] = useState("");
  const [isOpen, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      quantity: Number(formData.get("quantity")),
    };

    console.log("Yig‘ilgan ma’lumotlar:", data);

    if (!products._id) {
      console.error("Mahsulot ID topilmadi");
      return;
    }

    if (!data.title || !data.price || data.quantity <= 0) {
      toast.error("Iltimos, barcha maydonlarni to‘g‘ri to‘ldiring!");
      return;
    }

    try {
      const promise = newEditShopProduct(products._id, data, pathname);

      toast.promise(promise, {
        loading: "Yangilanmoqda...",
        success: {
          message: "Mahsulot ma’lumotlari yangilandi ✅",
          duration: 2500,
        },
        error: (error) => `Xatolik: ${error}`,
      });

      setOpen(false);
      setQuantity("");
    } catch (error) {
      console.error("Xatolik:", error);
      toast.error("Serverda xatolik yuz berdi");
    }
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

        {/* FORM BOSHI */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <article className="flex flex-col">
            <label className="mb-1 text-[14px]">Mahsulot nomi:</label>
            <input
              name="title"
              defaultValue={products.title}
              className="p-2 border outline-none rounded-md text-[14px]"
              type="text"
              placeholder="namuna: Pepsi"
            />
          </article>

          <article className="flex flex-col">
            <label className="mb-1 text-[14px]">Mahsulot tavsifi:</label>
            <input
              name="description"
              defaultValue={products.description}
              className="p-2 border outline-none rounded-md text-[14px]"
              type="text"
              placeholder="namuna: 1.5l | Shakarsiz pepsi"
            />
          </article>

          <article className="flex flex-col">
            <label className="mb-1 text-[14px]">Mahsulot narxi:</label>
            <input
              name="price"
              defaultValue={products.price}
              className="p-2 border outline-none rounded-md text-[14px]"
              type="text"
              placeholder="namuna: 15 coin"
            />
          </article>

          <article className="flex flex-col">
            <label className="mb-1 text-[14px]">Mahsulot soni:</label>
            <input
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="p-2 border outline-none rounded-md text-[14px]"
              type="number"
              placeholder="namuna: 10"
            />
          </article>

          <button
            type="submit"
            className="border p-2 w-[100px] rounded-md cursor-pointer bg-orange-500 text-white"
          >
            Saqlash
          </button>
        </form>
        {/* FORM OXIRI */}
      </DialogContent>
    </Dialog>
  );
}

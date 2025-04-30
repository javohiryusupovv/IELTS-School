"use client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import Image from "next/image";
import { BsCoin } from "react-icons/bs";
import { ICreateShop, IStudent } from "@/types/type";
import { toast } from "sonner";
import { useState } from "react";
import { salesUpdateCoins } from "@/actions/student.action";
import { usePathname } from "next/navigation";

interface Props {
  product: ICreateShop;
  coins: number;
  student: IStudent;
}

export default function ClientComponent({ product, coins, student }: Props) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (coins >= product.price) {
      try {
        const result = await salesUpdateCoins(
          student._id,
          product.price,
          pathname
        );
        if (result.success) {
          handlePurchaseBot();
        } else {
          toast.error("Coin ayirishda xatolik: " + result.message);
        }
      } catch (err) {
        console.error(err);
        toast.error("Server bilan ulanishda xatolik");
      } finally {
        setOpen(false);
      }
    } else {
      toast.error(`Sizda yetarli coin mavjud emas!`);
    }
  };

  const handlePurchaseBot = () => {
    setIsLoading(true);
    const telegramBotId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_API!;
    const telegramChatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID!;
const message = `
👨‍🎓 Name: ${student.name} ${student.surname}

📔 Kurs: ${student.course.courseTitle}

🖊 Title: ${product.title}

🧾 Description: ${product.description}

💵 Price: ${product.price}

📆 Date: ${new Date().toLocaleDateString()}
`.trim();
    const promise = fetch(
      `https://api.telegram.org/bot${telegramBotId}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "cache-control": "no-cache",
        },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: message,
          parse_mode: "HTML",
      }),
      }
    ).finally(() => {
      setIsLoading(false);
    });

    toast.promise(promise, {
      loading: "Loading...",
      success: {
        message: "Mahsulot muvaffaqiyatli sotib olindi, tabriklaymiz!",
        duration: 2500,
        style: {
          height: "50px",
          color: "green",
          border: "1px solid #17be5a",
          backgroundColor: "white",
          boxShadow: "0 0px 5px #17be5a56",
        },
      },
      error: "Something went wrong!",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="flex">
        <Button className="mt-5 mb-8 w-full py-2 px-12 flex items-center">
          Sotib olish
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl font-bold">{product.title}</DialogTitle>
        <DialogDescription>
          Bu mahsulotni sotib olish uchun{" "}
          <span className="text-green-500">{product.price}</span> coin
          sarflanadi.
        </DialogDescription>
        <article className="w-full flex justify-center overflow-hidden">
          <Image
            src={product.image}
            width={480}
            height={360}
            alt={product.title}
            priority
            className="w-[250px] object-cover rounded-md "
          />
        </article>
        <div className="flex items-center justify-between mb-5">
          <p className="flex items-center justify-end gap-1 py-1 px-4 rounded-[5px] border overflow-hidden">
            <BsCoin className="fill-[#f9d222] text-[20px]" />
            <span className="font-normal text-[14px]">{product.price}</span>
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="py-2 px-4 rounded-md text-white bg-orange-500 hover:bg-orange-400/90 hover:text-white transition-all duration-300"
        >
          Select
        </button>
      </DialogContent>
    </Dialog>
  );
}

"use client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import Image from "next/image";
import { BsCoin } from "react-icons/bs";
import { ICreateShop, IStudent } from "@/types/type";
import { toast } from "sonner";
import { useState } from "react";
import { salesUpdateCoins } from "@/actions/student.action";
import { usePathname, useRouter } from "next/navigation";
import { handleClickConfetti } from "./confetti";

interface Props {
  product: ICreateShop;
  coins: number;
  student: IStudent;
}

export default function ClientComponent({ product, coins, student }: Props) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (coins >= product.price) {
      try {
        const result = await salesUpdateCoins(
          student._id,
          product.price,
          product._id ?? "",
          pathname
        );
        if (result.success) {
          handlePurchaseBot();
          handleClickConfetti();
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
      toast.warning("Sizda yetarli coin mavjud emas!", {
        duration: 3000, // 3 soniya davomida ko‘rsatiladi
        style: {
          backgroundColor: "white", // sariq fon (Bootstrap warning rangi)
          color: "orange", // qora sariq matn rangi
          border: "1px solid orange",
          height: "50px",
        },
      });
    }
  };

  const handlePurchaseBot = () => {
    setIsLoading(true);
    const telegramBotId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_API!;
    const chatIds = [
      process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID1!,
      process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID2!,
      process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID3!,
    ];

    const message = `
👨‍🎓 Name: ${student.name} ${student.surname}

📔 Kurs: ${student.course.courseTitle}

🖊 Title: ${product.title}

🧾 Description: ${product.description}

💵 Price: ${product.price}

📆 Date: ${new Date().toLocaleDateString()}
`.trim();

    const promise = Promise.all(
      chatIds.map((chatId) =>
        fetch(`https://api.telegram.org/bot${telegramBotId}/sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "HTML",
          }),
        })
      )
    )
      .then(() => {
        router.push("/student/shop");
      })
      .finally(() => {
        setIsLoading(false);
      });

    toast.promise(promise, {
      loading: "Loading...",
      success: {
        message: "Mahsulot muvaffaqiyatli sotib olindi, tabriklaymiz!",
        duration: 2500,
        style: {
          height: "50px",
          marginTop: "30px",
          color: "green",
          border: "1px solid #17be5a",
          backgroundColor: "white",
        },
      },
      error: "Something went wrong!",
    });
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="flex">
        <button className="w-full flex justify-center py-2 px-4 rounded-md text-white bg-orange-500 hover:bg-orange-400/90 hover:text-white transition-all duration-300">
          Sotib Olish
        </button>
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
            alt="Mahsulot"
            priority
            className="w-full object-cover rounded-md "
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
          className={` py-2 px-4 rounded-md text-white bg-orange-500 hover:bg-orange-400/90 hover:text-white transition-all duration-300`}
        >
          Buyurtma berish
        </button>
      </DialogContent>
    </Dialog>
  );
}

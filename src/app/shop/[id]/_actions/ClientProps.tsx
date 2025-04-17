"use client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import Image from "next/image";
import { BsCoin } from "react-icons/bs";
import { ICreateShop } from "@/types/type";
import { useState } from "react";

interface Props{
  product: ICreateShop
}

export default function ClientComponent( { product }: Props) {
  const [names, setNames] = useState<string>("");
  const [surname, setSurname] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      firstName: names,
      lastName: surname,
    }
    console.log(data);
    
  }

  return (
    <Dialog>
      <DialogTrigger asChild className="flex">
        <Button className="mt-5 mb-8 py-2 px-12 flex items-center">Buy</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl font-bold">{product.title}</DialogTitle>
        <DialogDescription>
          Bu mahsulotni sotib olish uchun ma'lumotlarni to'ldiring.
        </DialogDescription>
        <Image
          src={product.image}
          width={480}
          height={360}
          alt={product.title}
          priority
        />
        <div className="flex items-center justify-between mb-5">
          <p className="flex items-center justify-end gap-1 py-1 px-4 rounded-[5px] border overflow-hidden">
            <BsCoin className="fill-[#f9d222] text-[20px]" />
            <span className="font-normal text-[14px]">{product.price}</span>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            name="firstName"
            placeholder="First name"
            value={names}
            onChange={(e) => setNames(e.target.value)}
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <button
            className="py-2 px-4 border hover:bg-black/50 hover:text-white transition-all duration-300"
          >
            Select
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

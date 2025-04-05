"use client";
import React, { useEffect, useState } from "react";
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
import { IProduct } from "@/types/type";
import { getcategory } from "../../../../../constants/page";

export default function ClientComponent({ product }: { product: IProduct }) {
  const category = getcategory;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    image: product.image,
    coin: product.coin,
    category: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

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
            <span className="font-normal text-[14px]">{product.coin}</span>
          </p>
        </div>
        <select
          name="category"
          className="w-full py-2 px-2 border rounded-md"
          value={formData.category}
          onChange={handleChange}
        >
          {category.map((cat: string, id: number) => (
            <option key={id} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <Input
          type="text"
          name="firstName"
          placeholder="First name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <button
          className="py-2 px-4 border hover:bg-black/50 hover:text-white transition-all duration-300"
          onClick={handleSubmit}
        >
          Select
        </button>
      </DialogContent>
    </Dialog>
  );
}

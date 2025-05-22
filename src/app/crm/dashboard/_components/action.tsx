"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IEducationCenter } from "../../../../../app.types";
import { educationCreate } from "@/actions/education.action";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export default function EducationAction() {
    const pathname = usePathname()
    const handleEducationCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
        const data = new FormData(e.currentTarget);

        const info: IEducationCenter = {
            educationTitle: data.get("educationTitle") as string,
            ownerName: data.get("ownerName") as string,
            phoneNumber: data.get("phoneNumber") as string,
            role: "owner"
        };

        const edu = educationCreate(info, pathname);
        toast.promise(edu, {
                loading: "O'quv Markaz qo'shilmoqda...",
                success: {
                    message: `O'quv markaz yaratildi!)`,
                    duration: 2500,
                    style: {
                        height: "50px", // fon yashil bo'ladi
                        color: "green",
                        border: "1px solid #17be5a",
                        backgroundColor: "white",
                    },
                },
                error: "O'quv markaz faqat 1 marta qo'shiladi",
            });
        await edu
        console.log(info);
        } catch (error) {
        console.log("O'quv markaz yaratilmadi");
        }
    };

  const handlePhoneNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let resValue = value.replace(/\D/g, "");
    if (resValue.length >= 8) {
      e.target.value = resValue.slice(0, 9); // Limit to 8 characters
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-orange-500 text-white border-orange-500">O'quv markaz qo'shish</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>O'quv markaz qushish</DialogTitle>
            <DialogDescription>
                O'quv markaz ma'lumotlarini to'ldiring
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleEducationCreate}
            className="flex flex-col gap-4"
          >
            <article className="flex flex-col justify-start">
              <label htmlFor="" className="mb-2">
                O'quv markaz nomi
              </label>
              <input
                name="educationTitle"
                type="text"
                className="w-full py-2 px-4 border outline-none rounded-md"
                placeholder="O'quv markaz nomi ..."
              />
            </article>
            <article className="flex flex-col justify-start">
              <label htmlFor="" className="mb-2">
                Direktor ismi
              </label>
              <input
                name="ownerName"
                type="text"
                className="w-full py-2 px-4 border outline-none rounded-md"
                placeholder="O'quv markaz direktori ismi ..."
              />
            </article>
            <article className="flex flex-col justify-start">
              <label htmlFor="" className="mb-2">
                Telefon raqam
              </label>
              <article
                className={`group flex gap-2 items-center rounded border px-3 transition-all duration-200`}
              >
                <span className="text-[14px] text-gray-500">+998 </span>
                <input
                  name="phoneNumber"
                  onInput={handlePhoneNumberInput}
                  className="w-full py-2 px-4 border-none outline-none rounded-md"
                  type="number"
                  autoComplete="off"
                  placeholder="Telefon raqam ..."
                />
              </article>
            </article>
            <button
              type="submit"
              className="px-2 py-2 border rounded-md cursor-pointer bg-green-500 text-white"
            >
              Saqlash
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

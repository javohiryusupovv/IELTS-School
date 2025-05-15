"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"



export default function PaymentModal() {
    const [cashStatus, setCashStatus] = useState<string>("")
    const [isOpen, setIsOpen] = useState(false)

    const handleCashPayment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const info = {
            manager: data.get("managerName") as string,
            markazTitle: data.get("nameMarkaz") as string,
            lastPayment: data.get("cashdays") as string,
            cashStatus: cashStatus,
            cashType: data.get("cashtype") as string
        }

        console.log(info);
        setIsOpen(false);
    }

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger className="p-3 bg-red-300 rounded-md cursor-pointer">
                    Open
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>To'lov qo'shish</DialogTitle>
                        <DialogDescription>
                            Formani to'ldirish orqali to'lov yaratiladi !
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCashPayment} className="flex flex-col gap-4">
                        <article className="flex flex-col justify-start">
                            <label htmlFor="" className="mb-2">Manager ismi</label>
                            <input name="managerName" type="text" className="w-full py-2 px-4 border outline-none rounded-md" placeholder="To'lovni kiritgan manager ..." />
                        </article>
                        <article className="flex flex-col justify-start">
                            <label htmlFor="" className="mb-2">Tashkilot nomi</label>
                            <input name="nameMarkaz" type="text" className="w-full py-2 px-4 border outline-none rounded-md" placeholder="Tashkilot nomini kiriting ..." />
                        </article>
                        <article className="flex flex-col justify-start">
                            <label htmlFor="" className="mb-2">To'lov kuni</label>
                            <input name="cashdays" type="text" className="w-full py-2 px-4 border outline-none rounded-md" placeholder="To'lov qilingan kun ..." />
                        </article>
                        <div className="flex items-center gap-2 mb-4">
                            <article className="flex grow flex-col justify-start">
                                <label htmlFor="" className="mb-2">To'lov statusi</label>
                                <Select onValueChange={(value) => setCashStatus(value)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="To'lov statusi ..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="pending" className="bg-[#FF9548] text-white mb-2">Pending</SelectItem>
                                            <SelectItem value="success" className="bg-green-500 text-white">Success</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </article>
                            <article className="flex flex-col justify-start">
                                <label htmlFor="" className="mb-2">To'lov turi  </label>
                                <input name="cashtype" type="text" className="w-full py-2 px-4 border outline-none rounded-md" placeholder="To'lov turini kiriting ..." />
                            </article>
                        </div>
                        <button type="submit" className="px-2 py-2 border rounded-md cursor-pointer bg-green-500 text-white">Saqlash</button>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}

"use client"

import { ShopActive } from "@/actions/shop.action"
import { Switch } from "@/components/ui/switch"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { IShops } from "../../../../../app.types"
import { toast } from "sonner"

interface Props {
    products: IShops
}

export default function SwitchSettings({ products }: Props) {
    const [isActive, setIsActive] = useState(products.activeProduct);
    const router = useRouter()

    const onUpdateStatus = () => {
        const newStatus = !isActive;

        const promise = ShopActive(products._id, newStatus);

        toast.promise(promise, {
            loading: "Loading...",
            success: () => {
                setIsActive(newStatus);
                router.refresh();
                return "O'zgartirildi";
            },
            error: "Xatolik yuz berdi statusda",
        });
    };

    return (
        <article className="flex items-center gap-2 absolute right-5 top-4">
            {isActive ? <p className="text-green-500">Faol</p> : <p className="text-red-500">Arxiv</p>}
            <Switch checked={isActive} onCheckedChange={onUpdateStatus} />
        </article>
    )
}
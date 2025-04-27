"use client"

import { ShopActive } from "@/actions/shop.action"
import { Switch } from "@/components/ui/switch"
import { ICreateShop } from "@/types/type"
import { usePathname } from "next/navigation"
import { useState } from "react"

interface Props {
    products: ICreateShop
}

export default function SwitchSettings({products}: Props) {
    const [isSwitch, setSwitch] = useState(Boolean(products.activeProduct));
    const [loading, setLoading] = useState(false);
    const pathname = usePathname()

    const handleChecked = async (checked: boolean) => {
        setLoading(true);
        try {
            await ShopActive(products._id!, checked, pathname);
            setSwitch(checked);
        } catch (error) {
            console.error("Error updating product status:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <article className="flex items-center gap-2 absolute right-5 top-4">
            {isSwitch ? <p className="text-green-500">Faol</p> : <p className="text-red-500">Arxiv</p>}
            <Switch checked={isSwitch} onCheckedChange={handleChecked} disabled={loading}/>
        </article>
    )
}

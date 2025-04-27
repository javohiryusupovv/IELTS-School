"use client"
import { ShopActive } from "@/actions/shop.action"
import { Switch } from "@/components/ui/switch"
import { ICreateShop } from "@/types/type"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

interface Props {
    products: ICreateShop
}

export default function SwitchSettings({ products }: Props) {
    const [isSwitch, setSwitch] = useState(products.activeProduct);
    const router = useRouter()
    const pathname = usePathname()

    const handleChecked = async (checked: boolean) => {
        setSwitch(checked);
        try {
            await ShopActive(products._id!, checked, pathname);
            router.refresh();
            if (checked) {
                toast.success("Mahsulot faol holatga o'tdi")
            } else {
                toast.warning("Mahsulot arxivga o'tdi")
            }
        } catch (error) {
            console.error("Error updating product status:", error);
            setSwitch(!checked);
        }
    }

    return (
        <article className="flex items-center gap-2 absolute right-5 top-4">
            {isSwitch ? <p className="text-green-500">Faol</p> : <p className="text-red-500">Arxiv</p>}
            <Switch checked={isSwitch} onCheckedChange={handleChecked} />
        </article>
    )
}
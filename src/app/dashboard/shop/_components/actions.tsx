"use client"

import { Switch } from "@/components/ui/switch"
import { IShops } from "../../../../../app.types"
import { ShopActive } from "@/actions/shop.action"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface Props {
    products: IShops
}

export default function SwitchSettings({products}: Props) {
    
    const [isSwitch, setSwitch] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (products) {
            setSwitch(Boolean(products.activeProduct));
        }
    }, [products]); // <-- products o'zgarsa ishlaydi

    const handleChecked = async (checked: boolean) => {
        setLoading(true);
        try{
            setSwitch(checked);
            localStorage.setItem("activeProduct", JSON.stringify(checked));
            await ShopActive(products._id, checked);
        }catch(error){
            throw new Error("Xatolik yuz berdi")
        }finally{
            setLoading(false);
        }

        toast.success(checked ? "Faol holatga o'tdi" : "Arxivga o'tdi");

    };

    return (
        <article className="flex items-center gap-2 absolute right-5 top-4">
            {isSwitch ? <p className="text-green-500">Faol</p> : <p className="text-red-500">Arxiv</p>}
            <Switch checked={isSwitch} onCheckedChange={handleChecked} disabled={isLoading}/>
        </article>
    )
}

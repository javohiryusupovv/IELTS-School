"use client"
import { ShopActive } from "@/actions/shop.action"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

interface Props {
    status: boolean,
    productID: string
}

export default function SwitchSettings({ status, productID }: Props) {
    const [currentStatus, setCurrentStatus] = useState(status)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleChecked = async () => {
        setIsLoading(true)
        const newStatus = !currentStatus
        setCurrentStatus(newStatus)

        try {
            await ShopActive(productID, newStatus, "/student/shop");
            router.refresh();
            toast.success(`${newStatus ? "Mahsulot bor" : "Mahsulot yo'q"}`)
        } catch (error) {
            setCurrentStatus(!newStatus)
            throw new Error("Error updating status")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <article className="flex items-center gap-2 absolute right-5 top-4">
              {status ? <p className="text-green-500">Faol</p> : <p className="text-red-500">Arxiv</p>}
              <Switch checked={status} onCheckedChange={handleChecked} disabled={isLoading} />            </article>
    
    )
}
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
            toast.success(newStatus ? "Faol holatga o'tdi" : "Arxiv holatga o'tdi", {
                duration: 2000,
                style: {
                    height: "50px",
                    color: newStatus ? "green" : "red",
                    border: `1px solid ${newStatus ? "#17be5a" : "#ff4343"}`,
                    backgroundColor: "white",
                    boxShadow: `0 0px 5px ${newStatus ? "#17be5a56" : "#ff434383"}`,
                },
            })
        } catch (error) {
            setCurrentStatus(!newStatus)
            throw new Error("Error updating status")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <article className="flex items-center gap-2 absolute right-5 top-4">
              {currentStatus ? <p className="text-green-500">Faol</p> : <p className="text-red-500">Arxiv</p>}
              <Switch checked={currentStatus} onCheckedChange={handleChecked} disabled={isLoading} />            
        </article>
    )
}
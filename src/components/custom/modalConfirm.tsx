"use client"


import { LogOutAdmin } from "@/actions/login.action"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTopLoader } from "nextjs-toploader"
import { useState } from "react"

interface Props{
    handleClose: () => void
}

export default function ModalConfirm({handleClose}: Props) {
    const router = useRouter()
    const topLoading = useTopLoader()
    const [isLoading, setIsLoading] = useState(false)
    const handleLogout = async () => {
        setIsLoading(true)
        topLoading.start()
        await LogOutAdmin()
        router.push("/reception") // logoutdan keyin reception sahifasiga qaytaradi
        topLoading.done()
    }
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button className="flex items-center gap-2 justify-center w-full py-2 border bg-red-600 hover:bg-red-500/80 transition-all duration-200 text-white rounded-md"><LogOut /> Chiqish</button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-sm:w-[400px] max-sm:rounded-md max-sidebar:w-[320px]">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="max-sidebar:text-[17px] leading-4">Tizimdan chiqmoqdasiz !</AlertDialogTitle>
                        <AlertDialogDescription className="max-sidebar:text-[12px]">
                            <span className="text-green-500 underline">Ha</span> ni bosish orqali tizimdan chiqasiz !!!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isLoading} onClick={handleClose}>Yuq</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleLogout}
                            disabled={isLoading}
                            className="flex items-center gap-2"
                        >
                            {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
                            {isLoading ? "Chiqilmoqda..." : "Ha"}
                        </AlertDialogAction>                    
                        </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

"use client"

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
import { Button } from "@/components/ui/button"
import { IAdministrator } from "../../../../../app.types"
import { usePathname } from "next/navigation"
import { accountsDelete } from "@/actions/education.action"
import { toast } from "sonner"
import { useTransition } from "react"
import { Delete, Trash2 } from "lucide-react"

interface Props {
    accounst: IAdministrator
}

export default function DeleteReception({ accounst }: Props) {
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition()



    const handleDelete = async () => {


        startTransition(async () => {
            if (!accounst._id) {
                console.error('Account ID is missing');
                return;
            }

            try {
                await accountsDelete(accounst._id, pathname)
                toast.success("Account muvafaqiyatli o'chirildi");
            } catch (error) {
                console.error('Error deleting account:', error);
                toast.error("account o'chirishda xatolik yuz berdi");
            }

        })
    };

    return (
        <div className="flex items-center justify-center">
            <AlertDialog>
                <AlertDialogTrigger className="flex items-center gap-2 border bg-red-500 p-1 rounded-md cursor-pointer text-white text-[12px]">
                    <Trash2 className="w-5 h-5"/> O'chirish
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Foydalanuvchini o'chirish</AlertDialogTitle>
                        <AlertDialogDescription>Tasdiqlash orqali foydalanuvchini tizimdan o'chirasiz !</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isPending}>Yo'q</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={isPending}>Ha</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

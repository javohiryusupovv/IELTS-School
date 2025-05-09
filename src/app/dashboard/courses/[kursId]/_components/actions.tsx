"use client"

import { DeleteCourse } from "@/actions/course.action";
import { toast } from "sonner";
import { ICourse } from "@/types/type";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";


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

interface Props {
    course: ICourse
}

export default function Actions({ course }: Props) {
    const router = useRouter();
    const pathname = usePathname()
    const [textStatus, settextStatus] = useState(false);

    const onDelete = () => {
        settextStatus(true);
        const toastId = toast.loading("O'chirilmoqda...");
        DeleteCourse(course._id, pathname)
            .then(() => {
                // 2. Muvaffaqiyatli o'chirilganda toasti yangilash
                toast.success("Muvaffaqiyatli o'chirildi!", { id: toastId });
                router.push("/dashboard/courses");
            })
            .catch(() => {
                // 3. Xatolik bo'lsa toastni yangilash
                toast.error("Xatolik yuz berdi!", { id: toastId });
            })
            .finally(() => {
                settextStatus(false)
            })
    }

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button disabled={textStatus} className="py-3 transition-all duration-200 bg-red-600 rounded-full px-7 hover:bg-red-500/70">
                        <p className="text-[15px] font-medium text-white">
                            {textStatus ? "O'chirilmoqda" : "O'chirish"}
                        </p>
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="grid items-center grid-cols-2 gap-2">
                        <AlertDialogCancel>Yo&apos;q</AlertDialogCancel>
                        <AlertDialogAction onClick={onDelete}>Ha</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

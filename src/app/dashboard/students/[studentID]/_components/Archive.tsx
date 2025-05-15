import { Ghost } from "lucide-react";

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
    ArxiveStudentHande: (isActive: boolean) => void;
}


export default function Archive({ ArxiveStudentHande }: Props) {
    return (
        <div>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button className=" relative top-0 left-0 group border rounded-full p-[5px] hover:bg-red-500 transition-all duration-300 border-red-400">
                        <p className=" absolute top-0 left-9 rounded-sm max-studentCard:-left-[50px] max-studentCard:top-0 px-2 py-1 text-[12px] border text-red-600 border-red-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">Arxiv</p>
                        <Ghost className=" w-5 h-5 group-hover:stroke-white stroke-red-500 transition-all duration-300 group-hover:border-transparent" />
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-sm:w-[400px] max-sm:rounded-md max-sidebar:w-[320px]">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="max-sidebar:text-[15px] leading-4">O'quvchini Arxive qilasizmi !!!</AlertDialogTitle>
                        <AlertDialogDescription className="max-sidebar:text-[12px]">
                            O'quvchini arxive qilish uchun tasdiqlang.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="max-sm:gap-2">
                        <AlertDialogCancel>yo'q</AlertDialogCancel>
                        <AlertDialogAction onClick={() => ArxiveStudentHande(false)}>Ha</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

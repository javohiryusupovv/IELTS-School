import Image from "next/image"
import Active from "../../../../../../public/icons/activeUser.png"


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
    ActiveStudentHande: (isActive: boolean) => void;
}

export default function ActiveStudentFunc({ ActiveStudentHande }: Props) {
    return (
        <div>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button className=" relative top-0 left-0 group transition-all duration-300 border-orange-400">
                        <p className=" absolute top-[2px] left-10 rounded-sm px-2 py-1 text-[12px] border text-green-600 border-green-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">Activ</p>
                        <Image width={35} src={Active} alt="Active" />                  
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>O'quvchini Active qilasizmi !!!</AlertDialogTitle>
                        <AlertDialogDescription>
                            O'quvchini active qilish uchun tasdiqlang.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>yo'q</AlertDialogCancel>
                        <AlertDialogAction onClick={() => ActiveStudentHande(true)}>Ha</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

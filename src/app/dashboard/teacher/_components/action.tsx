"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
} from "@/components/ui/alert-dialog";

import { EllipsisVertical, Trash, UserRoundPen } from "lucide-react";
import { usePathname } from "next/navigation";
import { deleteTeachers } from "@/actions/teacher.action";

interface Props {
  teacher: any;
}

export default function ActionsTeacher({teacher}: Props) {
  const pathname = usePathname();
  const handleDelete = async() => {
    try{
      const deleteTeacher = deleteTeachers(teacher._id, pathname);
      await deleteTeacher;
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <article className="group rounded-full p-1 hover:bg-orange-500/70 transition-all duration-200 bg-orange-300/20">
            <EllipsisVertical className="w-4 h-4 group-hover:stroke-white stroke-orange-500" />
          </article>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2 w-32 p-0 px-1 py-2 shadow-none">
          <button className="w-full flex items-center gap-3 text-[12px] group hover:bg-accent py-1 px-2 text-orange-500 rounded">
            <UserRoundPen className="w-4 h-4 stroke-orange-500" /> Tahrirlash
          </button>
          <DeleteAction  handleDelete={handleDelete}/>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface DeleteActionProps {
  handleDelete: () => void;
}

const DeleteAction = ({ handleDelete }: DeleteActionProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full flex items-center gap-3 text-[12px] group hover:bg-accent py-1 px-2 text-red-600 rounded">
          <Trash className="w-4 h-4 stroke-red-600" />
          O'chirish
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>O'qituvchini o'chirmoqdasiz !</AlertDialogTitle>
          <AlertDialogDescription>
            O'qituvchini o'chirishni tasdiqlaysizmi? Bu orqali o'qituvchi barcha ma'lumotlarini yo'qotadi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Yo'q</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Ha</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

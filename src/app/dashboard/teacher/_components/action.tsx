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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { EllipsisVertical, Trash, UserRoundPen } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { deleteTeachers, editTeacher } from "@/actions/teacher.action";
import { useState } from "react";
import { IEditTeacher } from "../../../../../app.types";
import { toast } from "sonner";

interface Props {
  teacher: any;
}

export default function ActionsTeacher({ teacher }: Props) {
  const pathname = usePathname();
  const handleDelete = async () => {
    try {
      const deleteTeacher = deleteTeachers(teacher._id, pathname);
      await deleteTeacher;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <article className="group rounded-full p-1 hover:bg-orange-500/70 transition-all duration-200 bg-orange-300/20">
            <EllipsisVertical className="w-4 h-4 group-hover:stroke-white stroke-orange-500" />
          </article>
        </PopoverTrigger>
        <PopoverContent  className="flex flex-col gap-2 w-32 p-0 px-1 py-2 shadow-none">
          <EditTeacher teachers={teacher} />
          <DeleteAction handleDelete={handleDelete} />
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
      <AlertDialogContent className="max-sm:w-[400px] max-sm:rounded-md max-sidebar:w-[320px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="max-sidebar:text-[15px] leading-4">O'qituvchini o'chirmoqdasiz !</AlertDialogTitle>
          <AlertDialogDescription className="max-sidebar:text-[12px]">
            O'qituvchini o'chirishni tasdiqlaysizmi? Bu orqali o'qituvchi barcha
            ma'lumotlarini yo'qotadi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="max-sm:gap-2">
          <AlertDialogCancel>Yo'q</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Ha</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

interface EditTeacherProps {
  teachers: any;
}

const EditTeacher = ({ teachers }: EditTeacherProps) => {
  const [isopen, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const handleEditTeacher = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const teacher: IEditTeacher = {
      teacherName: data.get("name") as string,
      teacherSurname: data.get("surname") as string,
      teacherPhone: data.get("phone") as string,
      teacherPassword: data.get("password") as string,
    };

    try {
      const updateTeachers = editTeacher(
        teachers._id.toString(),
        teacher,
        pathname
      );
      toast.promise(updateTeachers, {
        loading: "Yuklanmoqda...",
        success: {
          message: "O'qituvchi ma'lumotlari yangilandi!",
          duration: 2500,
          style: {
            height: "50px",
            color: "green",
            border: "1px solid #17be5a",
            backgroundColor: "white",
          },
        },
        error: "O'quvchini yangilashda xatolik!",
      });
      await updateTeachers;
    } catch (error) {
      console.error("Teacher Yangilashda xatolik");
    } finally {
      setOpen(false);
    }
  };

  return (
    <Dialog open={isopen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-full flex items-center gap-3 text-[12px] group hover:bg-accent py-1 px-2 text-orange-500 rounded">
          <UserRoundPen className="w-4 h-4 stroke-orange-500" /> Tahrirlash
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Teacherni tahrirlash</DialogTitle>
          <DialogDescription>
            Teacherni tahrirlash uchun to'ldiring !
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleEditTeacher} className="grid gap-4 py-4">
          <label className="relative w-full">
            <input
              type="text"
              name="name"
              required
              defaultValue={teachers.teacherName}
              className="peer border w-full p-2 rounded outline-none focus:border-orange-500 transition-all duration-200"
              placeholder=" "
            />
            <p
              className="absolute left-2 bg-white px-2 text-gray-500 text-[12px] transition-all duration-200
              peer-placeholder-shown:top-[10px] 
              peer-placeholder-shown:text-gray-400
              peer-focus:-top-3 
              peer-focus:text-orange-500
              peer-valid:-top-3 
              peer-valid:text-[14px]"
            >
              Ism
            </p>
          </label>
          <label className="relative w-full">
            <input
              type="text"
              name="surname"
              required
              defaultValue={teachers.teacherSurname}
              className="peer border w-full p-2 rounded outline-none focus:border-orange-500 transition-all duration-200"
              placeholder=" "
            />
            <p
              className="absolute left-2 bg-white px-2 text-gray-500 text-[12px] transition-all duration-200
              peer-placeholder-shown:top-[10px] 
              peer-placeholder-shown:text-gray-400
              peer-focus:-top-3 
              peer-focus:text-orange-500
              peer-valid:-top-3 
              peer-valid:text-[14px]"
            >
              Familiya
            </p>
          </label>
          <label className="relative w-full">
            <input
              type="text"
              name="phone"
              required
              defaultValue={teachers.teacherPhone}
              className="peer border w-full p-2 rounded outline-none focus:border-orange-500 transition-all duration-200"
              placeholder=" "
            />
            <p
              className="absolute left-2 bg-white px-2 text-gray-500 text-[12px] transition-all duration-200
              peer-placeholder-shown:top-[10px] 
              peer-placeholder-shown:text-gray-400
              peer-focus:-top-3 
              peer-focus:text-orange-500
              peer-valid:-top-3 
              peer-valid:text-[14px]"
            >
              Phone number
            </p>
          </label>
          <label className="relative w-full">
            <input
              type="text"
              name="password"
              required
              className="peer border w-full p-2 rounded outline-none focus:border-orange-500 transition-all duration-200"
              placeholder=" "
            />
            <p
              className="absolute left-2 bg-white px-2 text-gray-500 text-[12px] transition-all duration-200
              peer-placeholder-shown:top-[10px] 
              peer-placeholder-shown:text-gray-400
              peer-focus:-top-3 
              peer-focus:text-orange-500
              peer-valid:-top-3 
              peer-valid:text-[14px]"
            >
              Password
            </p>
          </label>
          <button
            className="px-4 py-2 rounded bg-orange-500 text-white transition-all duration-200 hover:bg-orange-500/70"
            type="submit"
          >
            Save changes
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FilePenLine } from "lucide-react";

export default function EditProfile() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="group relative top-0 left-0">
            <FilePenLine className="group-hover:stroke-orange-500 transition-all duration-200 stroke-[1.4] w-[20px] h-[20px]" />{" "}
            <p className=" absolute -top-8 -left-4 rounded-sm px-2 py-1 text-[10px] border text-orange-600 border-orange-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              Tahrirlash
            </p>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Profile tahrirlash</DialogTitle>
            <DialogDescription>
              Siz o'z profilingizni tahrirlashingiz mumkin
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <label className="relative w-full">
              <input
                type="text"
                className="peer border w-full p-2 rounded outline-none focus:border-orange-500 transition-all duration-200"
                placeholder=" "
              />
              <p className="absolute left-2 text-gray-500 bg-white px-2 text-[12px] transition-all duration-200 peer-placeholder-shown:top-[10px] peer-focus:text-[14px] peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-orange-500">
                Ism va Familiya?
              </p>
            </label>
            <label className="relative w-full">
              <input
                type="text"
                className="peer border w-full p-2 rounded outline-none focus:border-orange-500 transition-all duration-200"
                placeholder=" "
              />
              <p className="absolute left-2 text-gray-500 bg-white px-2 text-[12px] transition-all duration-200 peer-placeholder-shown:top-[10px] peer-focus:text-[14px] peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-orange-500">
                Phone number
              </p>
            </label>
            <label className="relative w-full">
              <input
                type="text"
                className="peer border w-full p-2 rounded outline-none focus:border-orange-500 transition-all duration-200"
                placeholder=" "
              />
              <p className="absolute left-2 text-gray-500 bg-white px-2 text-[12px] transition-all duration-200 peer-placeholder-shown:top-[10px] peer-focus:text-[14px] peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-orange-500">
                Login
              </p>
            </label>
            <label className="relative w-full">
              <input
                type="text"
                className="peer border w-full p-2 rounded outline-none focus:border-orange-500 transition-all duration-200"
                placeholder=" "
              />
              <p className="absolute left-2 text-gray-500 bg-white px-2 text-[12px] transition-all duration-200 peer-placeholder-shown:top-[10px] peer-focus:text-[14px] peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-orange-500">
                Password
              </p>
            </label>
          </div>
          <DialogFooter>
            <button className="px-4 py-2 rounded bg-orange-500 text-white transition-all duration-200 hover:bg-orange-500/70" type="submit">Save changes</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createAdministrator } from "@/actions/education.action";
import { usePathname } from "next/navigation";
import { toast } from "sonner";


interface Props{
  educationData: {
    _id: string
  }
}

export default function DialogCloseButton({educationData}: Props) {
  const pathname = usePathname();
  
  
  const handleSubmitAccounts = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = new FormData(e.currentTarget);
      const fullData = {
        fullname: data.get("fullname") as string,
        login: data.get("login") as string,
        password: data.get("password") as string,
        phone: data.get("phone") as string,
        role: data.get("attendance") as string,
        educationCenter: educationData._id 
      };

    
      const accounts = toast.promise(createAdministrator(fullData, pathname), {
        loading: "Yuklanmoqda...",
        success: "Account yaratildi!",
        error: (err) => err.message,
      });
      await accounts;
    } catch (error) {
      throw new Error("Error creating account");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-4 py-3 text-[13px] bg-orange-500 rounded-lg flex items-center gap-2 text-white hover:bg-orange-600">
          <Plus />
          Foydalanuvchi Yaratish
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="mb-4">User ma'lumotlari</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmitAccounts}>
          <label className="relative w-full">
            <input
              type="text"
              name="fullname"
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
              Ism va Familiya?
            </p>
          </label>
          <label className="relative w-full">
            <input
              type="text"
              name="login"
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
              Login
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
          <label className="relative w-full">
            <input
              type="text"
              name="phone"
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
              Telefon raqam
            </p>
          </label>
          <article>
            <h6 className="mb-3">User turi ?</h6>
            <div className="flex items-center gap-4 custom-radio">
              <label className="relative flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="attendance"
                  className="hidden peer"
                  value="administrator"
                  defaultChecked
                  required
                />
                <div className="w-[15px] h-[15px] rounded-full border-[1px] border-black peer-checked:bg-blue-500 peer-checked:border-blue-500"></div>
                <span className="text-gray-500 text-[12px]">Administrator</span>
              </label>
            </div>
          </article>
          <button className="py-2 px-6 rounded-lg text-white bg-orange-500 hover:bg-orange-600 transition">
            Yaratish
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

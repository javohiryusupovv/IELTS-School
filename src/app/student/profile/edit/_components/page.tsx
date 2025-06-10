"use client"

import { newUpdatedStudent } from "@/actions/student.check";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

interface StudentProps {
  studentInfo: any
}

export default function Edit({ studentInfo }: StudentProps) {
  const pathname = usePathname();
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      password: formData.get("password") as string,
    };

    // Trim and normalize inputs
    const isSame =
      data.password.trim() === "";

    if (isSame) {
      toast.info("Ma'lumotlar o'zgartirilmagan!", {
        duration: 2000,
        style: {
          height: "50px",
          color: "white",
          backgroundColor: "orange",
          marginTop: "70px"
        },
      });
      return;
    }

    const resultupdated = newUpdatedStudent(studentInfo._id, data, pathname);


    const toastId = toast.loading("Yuklanmoqda...", {
      duration: 2000,
      style: {
        height: "50px",
        color: "gray",
        backgroundColor: "white",
        marginTop: "70px"
      },
    });
    try {
      await resultupdated;
      toast.dismiss(toastId);
      toast.success("Profil muvaffaqiyatli yangilandi!", {
        duration: 2000,
        style: {
          height: "50px",
          color: "white",
          backgroundColor: "#22c55e",
          border: "1px solid white",
          marginTop: "70px"
        },
      });
      router.push("/student/profile");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Xatolik yuz berdi, qayta urinib ko'ring!", {
        duration: 2000,
        style: {
          color: "white",
          backgroundColor: "#ef4444",
          border: "1px solid white",
          marginTop: "70px"
        },
      });
    }


    await resultupdated;
  };


  return (
    <div className="min-h-scree px-5 space-y-4 font-sans pt-[75px]">
      <div className="flex items-center justify-center mb-10">
        <h1 className="font-bold text-[20px]">Profilni tahrirlash</h1>
        <div></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Ism *</label>
          <input
            type="text"
            defaultValue={studentInfo?.name}
            disabled
            className="w-full rounded-lg p-2 mt-1 bg-gray-100 border border-gray-300 text-gray-600 cursor-not-allowed outline-none focus:border-[#3978ff] focus:shadow-sm focus:shadow-[#0000ff22] transition-all duration-200"
            placeholder="Ismingizni kiriting"
          />
        </div>
        <div>
          <label className="block text-sm">Familiya *</label>
          <input
            type="text"
            defaultValue={studentInfo?.surname}
            disabled
            className="w-full rounded-lg p-2 mt-1 bg-gray-100 border border-gray-300 text-gray-600 cursor-not-allowed outline-none focus:border-[#3978ff] focus:shadow-sm focus:shadow-[#0000ff22] transition-all duration-200"
            placeholder="Ismingizni kiriting"
          />
        </div>
        <div>
          <label className="block text-sm">Telefon raqam *</label>
          <input
            type="number"
            defaultValue={studentInfo?.phone}
            disabled
            className="w-full rounded-lg p-2 mt-1 bg-gray-100 border border-gray-300 text-gray-600 cursor-not-allowed outline-none focus:border-[#3978ff] focus:shadow-sm focus:shadow-[#0000ff22] transition-all duration-200"
            placeholder="Telfon raqamingizni kiriting"
          />
        </div>
        <div>
          <label className="block text-sm">Password *</label>
          <input
            type="text"
            name="password"
            className="w-full rounded-lg p-2 mt-1 outline-none focus:border-[#3978ff] focus:shadow-sm focus:shadow-[#0000ff22] transition-all duration-200"
            placeholder="Passworingizni kiriting"
          />
        </div>
        <button className="block text-center w-full bg-orange-500/80 text-white active:scale-105 font-bold py-2 rounded-lg">
          Saqlash
        </button>
      </form>
    </div>
  );
}

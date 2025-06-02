"use client";
import { Bitcoin, Instagram, Pencil, Send, SquarePen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfileView() {
  const router = useRouter();

  return (
    <div className="min-h-screen space-y-4 font-sans">
      <div className=" rounded-b-2xl ">
        {/* Header */}
        <div className="flex items-center p-4 justify-between">
          <button className="text-gray-300">Back</button>
          <button className="text-gray-300">⋮</button>
        </div>
        {/* Profile Info */}
        <div className="flex flex-col p-4  items-center relative">
          <div className="w-20 h-20 rounded-full bg-white shadow-sm border flex items-center justify-center">
            <span className="text-3xl">+</span>
          </div>
          <button
            onClick={() => router.push("/student/profile/edit")}
            className="absolute left-[261px] top-[73px] rounded-full p-1"
          >
            <SquarePen size={16} />
          </button>
          <h2 className="mt-2 text-lg font-semibold">Yusupov Javokhir</h2>
          <p className="text-gray-400">+998 771207885</p>
        </div>
      </div>
      <div className="">
        {/* <div className="bg-orange-500/80 text-black p-4 mx-4 flex items-center justify-between rounded-xl">
          <div>
            <p className="text-sm font-bold">PREMIUM</p>
            <p>Imkoniyatlar karrasiga ko’proq</p>
          </div>
          <Bitcoin className="w-10 h-10 opacity-70" />
        </div> */}

        {/* Menu Items */}
        <div className="space-y-2 p-4">
          <div className="border bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
            <span className="font-medium">CoinX yangi uzgarishlar</span>
            <span className="text-xs text-yellow-400">Tez kunda</span>
          </div>

          <div className="border bg-white shadow-md rounded-lg p-4">Tranzaksiyalar</div>

          <div className="border bg-white shadow-md rounded-lg p-4 flex justify-between">
            <span>Ilova tili</span>
            <span className="text-gray-400">O'zbekcha</span>
          </div>

          <Link href="#" className="block">
            <div className="border bg-white shadow-md rounded-lg p-4 flex items-center gap-2">
              <Send size={16} /> Telegram kanalimiz
            </div>
          </Link>

          <Link href="#" className="block">
            <div className="border bg-white shadow-md rounded-lg p-4 flex items-center gap-2">
              <Instagram size={16} /> Instagram sahifamiz
            </div>
          </Link>

          <div className="border bg-white shadow-md rounded-lg p-4 flex justify-between">
            <span>Loyiha haqida</span>
            <span className="text-gray-400">v 1</span>
          </div>

          <div className="border bg-white shadow-md rounded-lg p-4">Ommaviy oferta</div>
        </div>
      </div>
    </div>
  );
}

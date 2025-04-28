import { Bell, Plus } from "lucide-react";
import Image from "next/image";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-4">
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 pl-10 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell size={29} className="text-gray-600" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>
        <button className="bg-orange-600 text-white rounded-full p-2 hover:bg-orange-700 transition">
          <Plus size={18} />
        </button>
        <div className="flex items-center gap-2">
          <Image src={"/img/bgID.png"} alt="Profile" width={18} height={18} className="w-8 h-8 rounded-full object-cover" />
          <span className="font-semibold text-gray-700">Shamsiddin Ro'ziboyev</span>
        </div>
      </div>
    </header>
  );
}

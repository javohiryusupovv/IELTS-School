"use client";
import Link from "next/link";
import { NvLinks } from "../constants";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-72 shadow-lg min-h-screen sticky left-0 top-0 flex flex-col items-center">
      <div className="flex items-center justify-center py-6 mb-10">
        <Link href={"/crm"}>
          <h1 className="text-2xl font-bold">CRM</h1>
        </Link>
      </div>
      <div className=" flex flex-col gap-y-1">
        {NvLinks.map((link, id) => {
          const active = pathname === link.href;
          return (
            <Link
              href={link.href}
              key={id}
              className={`flex items-center gap-2 py-4 px-5 rounded-lg transition-colors duration-200 ${
                active
                  ? "bg-orange-500 text-white"
                  : "bg-white hover:bg-gray-200"
              }`}
            >
              {link.icons && link.icons}
              <h1 className={`text-[15px] font-bold text-gray-700 ${active ? "text-white" : "text-black"}`}>{link.name}</h1>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

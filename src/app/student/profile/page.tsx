import { getStudentFromCookie } from "@/actions/student.check";
import { Instagram, Send, SquarePen } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProfileView() {
  const studentInfo = await getStudentFromCookie();  

  return (
    <div className="min-h-screen space-y-4 font-sans pt-[75px]">
      <div className=" rounded-b-2xl ">
        {/* Profile Info */}
        <div className="flex flex-col p-4  items-center relative">
          <div className="w-20 h-20 rounded-full bg-white shadow-sm border flex items-center justify-center">+</div>
          <Link href={"/student/profile/edit"}
            className=" absolute top-[75px] rounded-full p-1"
          >
            <SquarePen className="leaderContainer:w-14 w-12" />
          </Link>
          <h2 className="mt-2 text-lg font-semibold">{studentInfo.surname} {studentInfo.name}</h2>
          <p className="text-gray-400">+998 {studentInfo.phone}</p>
        </div>
      </div>
      <div className="">
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

          <Link href="https://t.me/coinxuz" target="_blank" className="block">
            <div className="border bg-white shadow-md rounded-lg p-4 flex items-center gap-2">
              <Send size={16} /> Telegram kanalimiz
            </div>
          </Link>

          <Link href="https://www.instagram.com/coinx.uz/" target="_blank" className="block">
            <div className="border bg-white shadow-md rounded-lg p-4 flex items-center gap-2">
              <Instagram size={16} /> Instagram sahifamiz
            </div>
          </Link>

          <div className="border bg-white shadow-md rounded-lg p-4 flex justify-between">
            <span>Loyiha haqida</span>
            <span className="text-gray-400">v 1</span>
          </div>
          <Link href={"https://drive.google.com/file/d/1BPPPnIsGRORVnnHQTUe9_K5rAAbv66Ba/view?usp=sharing"} target="_blank" className=" inline-flex w-full border bg-white shadow-md rounded-lg p-4">Ommaviy oferta</Link>
        </div>
      </div>
    </div>
  );
}

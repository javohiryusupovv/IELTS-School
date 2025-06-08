import { ShoppingBag, UserRound } from "lucide-react";
import Link from "next/link";
import { BiHome } from "react-icons/bi";
import { GiTrophyCup } from "react-icons/gi";
import "./tgbot.css";

export default async function Student({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[480px] flex-grow w-full mb-10">
        <main className="bg-gray-300/30 overflow-y-auto h-dvh pb-[64px]">
          {children}
        </main>
        <footer className="fixed bottom-0 max-w-[480px] w-full">
          <article className="flex justify-between items-end w-full px-4 py-2 bg-gray-300">
            <Link
              href={`/student`}
              className="flex flex-col items-center cursor-pointer group"
            >
              <BiHome className="text-3xl group-hover:fill-white transition-all duration-150" />
              <p className="group-hover:text-white font-medium text-large transition-all duration-150">
                Uy
              </p>
            </Link>
            <Link
              href={`/student/leaderboard`}
              className="flex flex-col items-center cursor-pointer group"
            >
              <GiTrophyCup className="text-3xl group-hover:fill-white transition-all duration-150" />
              <p className="group-hover:text-white font-medium text-large transition-all duration-150">
                Yetakchilar
              </p>
            </Link>
            <Link
              href={`/student/shop`}
              className="flex flex-col items-center cursor-pointer group"
            >
              <ShoppingBag className="text-3xl group-hover:stroke-white transition-all duration-150" />
              <p className="group-hover:text-white font-medium text-large transition-all duration-150">
                Shop
              </p>
            </Link>
            <Link
              href={`/student/profile`}
              className="flex flex-col items-center cursor-pointer group"
            >
              <UserRound  className="text-3xl group-hover:stroke-white transition-all duration-150" />
              <p className="group-hover:text-white font-medium text-large transition-all duration-150">
                Profile
              </p>
            </Link>
          </article>
        </footer>
      </div>
    </div>
  );
}

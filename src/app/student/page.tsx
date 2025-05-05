
import Image from "next/image";
import { BsCoin } from "react-icons/bs";
import "./tgbot.css";
import { getStudentFromCookie } from "@/actions/student.check";
import { GiTrophyCup } from "react-icons/gi";
import HistoryCoins from "./_components/page";

export default async function StudentDashboard() {
  const student = await getStudentFromCookie();  
  const coins = student?.coins?.reduce((sum: number, coin: any) => sum + coin.value, 0) ?? 0;
  return (
    <div className="pt-5 min-h-screen pb-20">
      <article className="w-11/12 py-20 rounded-md m-auto px-8 mb-10 bg-orange-400">
        <p className="text-[20px] font-medium mb-10 text-white">Salom, {student?.surname} {student?.name}</p>
        <div className="grid grid-cols-2 justify-center bg-white rounded-lg py-2 mb-11">
          <div className="flex flex-col border-r border-orange-500 last:border-r-0">
            <article className="flex justify-center items-center gap-2 mb-2">
              <BsCoin className="fill-[#f9d222] text-[24px]" />
              <span className="font-extralight text-sm">Jami Coinlar</span>
            </article>
            <p className="font-medium text-base text-center">{coins}</p>
          </div>
          <div className="flex flex-col border-r border-orange-500 last:border-r-0">
            <article className="flex justify-center items-center gap-2 mb-2">
              <GiTrophyCup className="fill-[#f9d222] text-[24px]" />
              <span className="font-extralight text-sm">Reyting </span>
            </article>
            <p className="font-medium text-base text-center">1</p>
          </div>
        </div>
      </article>
      <article className="relative top-0 right-0 w-11/12 py-20 bg-orange-400 m-auto rounded-md mb-5">
        <Image
          src="/img/twoPerson.png"
          alt="ImagePerson"
          width={96}
          height={128}
          className="object-contain absolute bottom-0 right-0"
        />
      </article>
      <div className="w-11/12 m-auto">
        <HistoryCoins student={student}/>
      </div>
    </div>
  );
}

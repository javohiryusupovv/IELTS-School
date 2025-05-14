import { getStudents } from "@/actions/student.action";
import "../tgbot.css";
import LeaderBoardPages from "./_components/action";
import GiftImg from "../../../../public/img/gift.png"
import Image from "next/image";


export default async function Leaderboard() {
  const students = await getStudents();
  const totalCoins = students?.map((item) => {
    return {
      name: item.name,
      surname: item.surname,
      total: item.coins?.reduce((sum: number, coin: any) => sum + coin.value, 0) || 0
    };
  });

  const sorted = totalCoins?.sort((a, b) => b.total - a.total);
  console.error(sorted)
  return(
  <div className="pb-20  relative top-0 left-0 overflow-hidden">
    <Image className=" fixed -left-10 top-20 w-[120px] rotate-[30deg] blur-[2px] -z-[1]" src={GiftImg} alt="Gidt Img" />
    <Image className=" fixed -right-10 top-0 w-[150px] -rotate-[20deg] blur-[2px] -z-[1]" src={GiftImg} alt="Gidt Img" />
    <Image className=" fixed right-14 bottom-[300px] w-[150px] -rotate-[20deg] blur-[1px] -z-[1]" src={GiftImg} alt="Gidt Img" />
    <Image className=" fixed -left-10 bottom-0 w-[200px] -rotate-[20deg] blur-[1px] -z-[1]" src={GiftImg} alt="Gidt Img" />
    <LeaderBoardPages studentsSort={sorted} />
    <p>{sorted.map((user)=> (
      <div className="bg-red-200">
        <p>{user.total}</p>
      </div>
    ))}</p>
  </div>
  )
}
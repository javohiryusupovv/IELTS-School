"use client";

import "../tgbot.css";
import LeaderBoardPages from "./_components/action";
import GiftImg from "../../../../public/img/gift.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import ISLoading from "./_components/isLoading";
import { getEducationData } from "@/actions/education.action";

interface CoinType {
  value: number;
  // add other properties if needed
}

interface StudentType {
  name: string;
  surname: string;
  total: number;
  coins?: CoinType[];
}

export default function Leaderboard() {
  const [leaderUser, setLeaderUser] = useState<StudentType[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const students = async () => {
      try {
        setLoading(true); // boshlanishida loading true
        const educationData = await getEducationData()
        const studentPublish = educationData?.students?.filter((s: any) => s.publishStudent === true);
        setLeaderUser(studentPublish)                
      } catch (err: any) {
        console.error("Xatolik yuz berdi:", err);
      } finally {
        setLoading(false); // har qanday holatda loading false bo'ladi
      }
    };
    students();
  }, []);

  const totalCoins = leaderUser?.map((item) => {
    return {
      name: item.name,
      surname: item.surname,
      total:
        item.coins?.reduce((sum: number, coin: any) => sum + coin.value, 0) ||
        0,
    };
  });

  const sorted = totalCoins?.sort((a, b) => b.total - a.total);
  return (
    <div className="pb-20  relative top-0 left-0 overflow-hidden">
      <Image
        className=" fixed -left-10 top-20 w-[120px] rotate-[30deg] blur-[2px] -z-[1]"
        src={GiftImg}
        alt="Gidt Img"
      />
      <Image
        className=" fixed -right-10 top-0 w-[150px] -rotate-[20deg] blur-[2px] -z-[1]"
        src={GiftImg}
        alt="Gidt Img"
      />
      <Image
        className=" fixed right-14 bottom-[300px] w-[150px] -rotate-[20deg] blur-[1px] -z-[1]"
        src={GiftImg}
        alt="Gidt Img"
      />
      <Image
        className=" fixed -left-10 bottom-0 w-[200px] -rotate-[20deg] blur-[1px] -z-[1]"
        src={GiftImg}
        alt="Gidt Img"
      />
         <div className="pt-[75px] w-11/12 m-auto">
          <p className="text-center mb-10 font-bold text-[18px]">
                Eng Faol Talabalar
            </p>
          {isLoading ? (
            <ISLoading/>
          ) : (
            <LeaderBoardPages studentsSort={sorted} />
          )}
         </div>
    </div>
  );
}

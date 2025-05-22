import Image from "next/image";
import { BsCoin } from "react-icons/bs";
import "./tgbot.css";
import { getStudentFromCookie } from "@/actions/student.check";
import HistoryCoins from "./_components/page";
import Persons from "../../../public/img/twoPerson.png";

import CreditCard from "../../../public/students/card4.png";
import CreditCardChip from "../../../public/students/cardChip.png";
import CreditCardWife from "../../../public/students/wife.png";
import IQLogo from "../../../public/students/logoCard.png";
import { Metadata } from "next";
import Head from "../head";


export default async function StudentDashboard() {
  const student = await getStudentFromCookie();
  const coins =
    student?.coins?.reduce((sum: number, coin: any) => sum + coin.value, 0) ??
    0;
  return (
    <div>
      <div className="pt-[100px] pb-[60px] container-cus">
      <article className="w-11/12 rounded-md m-auto mb-10">
        <div className=" relative top-0 left-0 rounded-[20px] overflow-hidden">
          <Image
            className="absolute left-10 top-5 w-[150px] container-img"
            src={IQLogo}
            alt="ChipCard"
          />
          <article className="custom-cardBG absolute top-16 w-full flex justify-between items-center px-10">
            <Image className="chip" src={CreditCardChip} alt="ChipCard" />
            <Image
              className="wife"
              src={CreditCardWife}
              alt="CreditCard Wife"
            />
          </article>
          <Image src={CreditCard} alt="CardCredit" />
          <div className="custom-hold flex justify-between w-full absolute bottom-0 h-[70px] px-10 backdrop-blur-sm bg-white/30">
            <article className="mt-3">
              <p className="text-[13px] text-white holder-title">Karta egasi</p>
              <span className="text-[17px] font-medium text-white holder-name">
                {student?.surname} {student?.name}
              </span>
            </article>
            <div className="mt-3">
              <p className="text-[13px] text-white mb-1">Coinlar</p>
              <div className="flex items-center gap-2">
                <BsCoin className="fill-[#f9d222] text-[24px]" />
                <p className="font-medium text-base text-center text-white">
                  {coins}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
      <article className="relative top-0 right-0 w-11/12 py-10 bg-white m-auto rounded-md mb-8 personShadow">
        <article className="pl-6 w-[70%]">
          <p className="text-[14px] leading-5">
            "Har bir coin — <span className="underline text-green-500">bu sening g'alabang!</span>" 
            "Harakat qil, o'z orzularingni ro'yobga chiqar!"
          </p>
        </article>
        <Image
          src={Persons}
          alt="ImagePerson"
          width={130}
          className="object-contain absolute bottom-0 right-0"
        />
      </article>
      <div className="w-11/12 m-auto">
        <HistoryCoins />
      </div>
    </div>
    </div>
    
  );
}

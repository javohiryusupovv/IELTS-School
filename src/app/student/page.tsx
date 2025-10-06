import Image from "next/image";
import { BsCoin } from "react-icons/bs";
import "./tgbot.css";
import { getStudentFromCookie } from "@/actions/student.check";
import HistoryCoins from "./_components/page";
import Persons from "../../../public/img/twoPerson.png";

import CreditCard from "../../../public/students/card66.png";
import CreditCardChip from "../../../public/students/cardChip.png";
import CreditCardWife from "../../../public/students/wife.png";

export const dynamic = "force-dynamic";

export default async function StudentDashboard() {
  const student = await getStudentFromCookie();
  const coins =
    student?.coins?.reduce((sum: number, coin: any) => sum + coin.value, 0) ??
    0;
  console.log(student);

  return (
    <div>
      <div className="pt-[100px] container-cus h-dvh">
        <article className="w-11/12 rounded-md m-auto mb-4">
          <div className=" relative top-0 left-0 rounded-[20px] overflow-hidden">
            {/* <Image className="absolute left-10 top-5 w-[150px] container-img" src={IQLogo} alt="ChipCard"/> */}
            <article className="custom-cardBG absolute top-20 w-full flex justify-between items-center px-10">
              <Image
                className="chip w-11"
                src={CreditCardChip}
                alt="ChipCard"
              />
              <Image
                className="wife w-6"
                src={CreditCardWife}
                alt="CreditCard Wife"
              />
            </article>
            <Image className="w-full" src={CreditCard} alt="CardCredit" />
            <div className="custom-hold flex justify-between w-full absolute bottom-0 h-[70px] px-10 backdrop-blur-sm bg-white/30">
              <article className="mt-3">
                <p className="text-[13px] text-white holder-title">
                  Karta egasi
                </p>
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
        <div className="mb-8">
          {student.balance > 0 ? (
            <div className="w-11/12 m-auto text-center">
              <p className="text-green-500 font-medium">
                To'lov holati: <span className="underline">To'langan</span>
              </p>
            </div>
          ) : (
            <div className="w-11/12 m-auto text-center">
              <p className="font-medium">
                To'lov holati: <span className=" underline text-red-500">To'lanmagan</span>
              </p>
            </div>
          )}
        </div>
        <article className="relative top-0 right-0 w-11/12 py-10 bg-white m-auto rounded-md mb-8 personShadow">
          <article className="pl-6 w-[70%]">
            <p className="text-[14px] leading-5">
              "Har bir coin —{" "}
              <span className="underline text-green-500">
                bu sening g'alabang!
              </span>
              " "Harakat qil, o'z orzularingni ro'yobga chiqar!"
            </p>
          </article>
          <Image
            src={Persons}
            alt="ImagePerson"
            width={130}
            className="object-contain absolute bottom-0 right-0"
          />
        </article>
        <div className="w-11/12 m-auto mb-3">
          <HistoryCoins />
        </div>
      </div>
    </div>
  );
}

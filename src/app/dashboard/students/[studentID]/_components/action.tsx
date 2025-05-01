"use client";

import { ActiveStudent } from "@/actions/student.action";
import { IStudent } from "@/types/type";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import studentImage from "../../../../../../public/img/student.png";
import Image from "next/image";
import { BsCoin } from "react-icons/bs";
import EditStudent from "./editStudent";
import { CircleCheckBig, TriangleAlert  } from "lucide-react";


import Archive from "./Archive";
import ActiveStudentFunc from "./ActiveStudent";
import { formatDate, formatReasonText } from "../../../../../../constants/page";

interface Props {
  student: IStudent;
}

export default function Actions({ student }: Props) {
  const pathname = usePathname();

  const ActiveStudentHande = (isActive: boolean) => {
    const promise = ActiveStudent(student._id, isActive, pathname);

    toast.promise(promise, {
      loading: "Yuklanmoqda...",
      success: {
        message: "O'quvchi Activ qilindi",
        duration: 2500,
        style: {
          height: "50px", // fon yashil bo'ladi
          color: "green",
          border: "1px solid #17be5a",
          backgroundColor: "white",
        },
      },
      error: "Error updated !",
    });
  };
  const ArxiveStudentHande = (isActive: boolean) => {
    const promise = ActiveStudent(student._id, isActive, pathname);

    toast.promise(promise, {
      loading: "Yuklanmoqda...",
      success: {
        message: "O'quvchi Arxiv qilindi",
        duration: 2500,
        style: {
          height: "50px",
          color: "orange",
          border: "1px solid orange",
          backgroundColor: "white",
        },
      },
      error: "Error updated !",
    });
  };

  const totalCoins =
    student?.coins?.reduce((sum: number, coin: any) => sum + coin.value, 0) ??
    0;
  const historyCoins = student?.coins?.map((coin: any) => {
    return {
      value: coin.value,
      reason: coin.reasons.map((reason: any) => reason.reason),
      date: coin.date,
    };
  });

  // const handleNotification = () => {
  //   toast.success("Kurs Yangilandi", {
  //     duration: 2500,
  //     style: {
  //       height: "50px", // fon yashil bo'ladi
  //       color: "green",
  //       border: "1px solid #17be5a",
  //       backgroundColor: "white",
  //       boxShadow: "0 0px 5px #17be5a56",
  //     },
  //   });
  // };

  return (
    <div>
      <div className="grid grid-cols-3 items-start gap-5 mb-4">
        <div className=" relative top-0 right-0 col-span-1 px-4 py-5 rounded-md shadowCustom">
          <div className="absolute top-5 right-3 flex flex-col items-center gap-2">
            <EditStudent student={student} />
            <ActiveStudentFunc ActiveStudentHande={ActiveStudentHande} />
            <Archive ArxiveStudentHande={ArxiveStudentHande} />
          </div>
          <div>
            <article className="flex justify-center items-center w-[80px] h-[80px] border rounded-full bg-gray-400/40 mb-10">
              <Image width={50} src={studentImage} alt="Student Profile" />
            </article>
            <h6 className="mb-2 text-[25px] font-medium">
              {student.surname} {student.name}
            </h6>
            <p className="mb-4 flex items-center gap-2">
              Studentid:{" "}
              <span className="px-2 text-[14px] rounded-full text-white bg-yellow-500">
                {student.studentID}
              </span>
            </p>
            <article className="flex items-center gap-[5px] mb-4">
              <BsCoin className=" fill-yellow-500 w-[15px] h-[15px]" />
              <ul className="flex items-end gap-[5px]">
                <li className="text-[18px] font-medium">{totalCoins}</li>
                <li className="text-[14px] text-gray-600/65">coins</li>
              </ul>
            </article>
            <ul>
              <li className="mb-1 text-[15px] text-gray-500/50">Telefon:</li>
              <li className="text-[15px] text-orange-500">{student.phone}</li>
            </ul>
          </div>
        </div>
        <div className="p-4 text-center col-span-2 rounded-lg shadowCustom">
          <p className="mb-4">Studentning Coinlar tarixi</p>
          <div className="w-full">
            {totalCoins < 1 ? (
              <p className="text-gray-500/50 text-[14px] my-5 underline">
                Coinlar tarixi mavjud
              </p>
            ) : (
              <div className="w-full flex flex-col gap-2 items-center">
                <div className="flex w-full py-2 px-4 border-b items-center  mb-3">
                  <article className="flex-[0.4] text-left ">
                    <p>Status</p>
                  </article>
                  <article className="flex-1 text-start">
                    <p>Sabab</p>
                  </article>
                  <article className="flex-1 text-center ">
                    <p>Sana</p>
                  </article>
                  <article className="flex-1 text-right mr-4">
                    <p>Coin</p>
                  </article>
                </div>
                {historyCoins?.map((coin, index) => (
                  <div
                    key={index}
                    className="flex w-full py-2 px-4 items-center bg-green-300/30 rounded-md mb-3"
                  >
                    <article className="flex-[0.4]">
                      <CircleCheckBig
                        className={`stroke-[1.5] w-5 h-5 ${
                          coin.value > 0 ? "stroke-green-500" : "stroke-red-500"
                        }`}
                      />
                    </article>
                    <article className="flex-1 text-start">
                      <article className="flex gap-2 items-center">
                        {coin.reason.map((reason: any, index: number) => (
                          <p
                            key={index}
                            className="text-[10px] text-white px-3 py-1 rounded-2xl bg-orange-500"
                          >
                            {formatReasonText(reason)}
                          </p>
                        ))}
                      </article>
                    </article>
                    <article className="flex-1 text-center">
                      <p className="text-gray-500/50">
                        {formatDate(coin.date)}
                      </p>
                    </article>
                    <article className="flex-1 justify-items-end text-right">
                      <p
                        className={`flex justify-center items-center w-14 h-6 rounded-3xl text-[14px] text-white bg-green-500 ${
                          coin.value > 0 ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {coin.value > 0 ? "+" : ""}
                        {coin.value}
                      </p>
                    </article>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

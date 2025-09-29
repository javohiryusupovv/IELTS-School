"use client";

import { ActiveStudent, addAdminCoins } from "@/actions/student.action";
import { ICourse, IStudent } from "@/types/type";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import studentImage from "../../../../../../public/img/student.png";
import Image from "next/image";
import { BsCoin } from "react-icons/bs";
import EditStudent from "./editStudent";
import { CircleCheckBig } from "lucide-react";

import Archive from "./Archive";
import ActiveStudentFunc from "./ActiveStudent";
import { formatDate, formatReasonText } from "../../../../../../constants/page";
import { useState } from "react";
import SelecStatus from "./selecStatus";
import Delete from "./delete";
import { iPropCourse } from "../../../../../../app.types";

interface Props {
  student: IStudent;
  courses: iPropCourse[]
}

export default function Actions({ student, courses }: Props) {
  const pathname = usePathname();
  const [coins, setCoins] = useState("");
  const [coinreason, setCoinreason] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const [activeTab, setActiveTab] = useState<"payments" | "coins">("payments"); // default To'lovlar

  const handleCoinRes = async () => {
    if (!coins || !coinreason) {
      toast.error("Coin miqdori va sababi to‘ldirilishi kerak!");
      return;
    }
    const coinFilter = parseFloat(coins);

    if (coinFilter < 0 && Math.abs(coinFilter) > totalCoins) {
      toast.error("Coin miqdori yetarli emas!");
      return;
    }

    try {
      const promise = addAdminCoins(
        student._id,
        coinreason,
        coinFilter,
        pathname
      );
      toast.promise(promise, {
        loading: "Coin qo'shilmoqda...",
        success: {
          message:
            coinFilter > 0
              ? "Coin muvaffaqiyatli qo'shildi!"
              : "Coin jarimasi olindi!",
          duration: 3000,
          style: {
            height: "50px",
            color: coinFilter > 0 ? "green" : "red",
            border: coinFilter > 0 ? "1px solid #17be5a" : "1px solid red",
            backgroundColor: "white",
          },
        },
        error: "Coin qo'shishda xatolik yuz berdi!",
      });

      setCoins("");
      setCoinreason("");
    } catch (error) {
      console.log("Coin qo'shishda Xatolik");
    }
  };

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
      _id: coin._id
    };
  });

  const filteredCoins = historyCoins?.filter((coin: any) => {
    if (selectStatus === "penalty") {
      return coin.value < 0 && !coin.reason.includes("Coin almashtirildi !");
    }
    if (selectStatus === "used") {
      return coin.reason.includes("Coin almashtirildi !");
    }
    if (selectStatus === "added") {
      return coin.value > 0 && !coin.reason.includes("Coin almashtirildi !");
    }
    return true;
  });

  console.log(student);
  

  return (
    <div>
      <div className="grid grid-cols-3 items-start gap-5 mb-4 max-studentCard:grid-cols-1">
        <div className=" relative top-0 right-0 col-span-1 max-studentCard:col-span-2 px-4 py-5 rounded-md shadowCustom">
          <div className="absolute top-5 right-6 flex flex-col items-center gap-2">
            <EditStudent student={student} courses={courses} />
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
            <p className="mb-4">
              Tug'ilgan kun: <span className="px-2 py-[3px] text-[14px] rounded-full text-white bg-green-400">13.09.2003</span>
            </p>
            <article className="mb-5">
              <p className="flex items-center gap-2">Balans: <span className="px-2 text-[14px] rounded-full text-white bg-red-500">{student.balance}</span></p>
            </article>
            <p className="mb-4 flex items-center gap-2">
              StudentID:{" "}
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
            <ul className="mb-5">
              <li className="mb-1 text-[15px] text-gray-500/50">Telefon:</li>
              <li className="text-[15px] text-orange-500">
                +998 {student.phone}
              </li>
            </ul>
            <ul className="mb-5">
              <li className="mb-1 text-[15px] text-gray-500/50">Ota-ona raqami:</li>
              <li className="text-[15px] text-orange-500">
                +998 {student.parentPhone}
              </li>
            </ul>
            <div className="">
              <label htmlFor="" className="flex flex-col">
                <p className="mb-2 text-[14px] text-gray-600/65">
                  Talabaga coin qo'shish
                </p>
              </label>
              <article className="flex items-end justify-between gap-4 mb-8 max-btn:block">
                <article className="flex flex-col w-[70%] gap-2">
                  <input
                    value={coins}
                    onChange={(e) => setCoins(e.target.value)}
                    className="px-2 py-1 border outline-none rounded-md max-studentCard: "
                    type="text"
                    placeholder="Coin sonini kiriting ?"
                  />
                  <input
                    value={coinreason}
                    onChange={(e) => setCoinreason(e.target.value)}
                    className="px-2 py-1 border outline-none rounded-md"
                    type="text"
                    placeholder="Coinni sababi ?"
                  />
                </article>
                <button
                  onClick={handleCoinRes}
                  className="border rounded-md cursor-pointer px-2 py-1 transition-all duration-200 bg-green-500 text-white hover:border-green-700 max-btn:mt-2"
                >
                  Qo'shish
                </button>
              </article>
              <div className="w-full h-[150px]">
                <p className="mb-4 text-[14px] text-gray-600/65">
                  Coinlar tarixi haqida:
                </p>
                <article className="flex flex-col gap-3">
                  <article className="flex items-center gap-2">
                    <p className="w-4 h-4 bg-green-500"></p>
                    <span className="text-[12px] text-gray-600/65">
                      Coin qo'shilgan !
                    </span>
                  </article>
                  <article className="flex items-center gap-2">
                    <p className="w-4 h-4 bg-orange-500"></p>
                    <span className="text-[12px] text-gray-600/65">
                      Talaba coindan foydalangan !
                    </span>
                  </article>
                  <article className="flex items-center gap-2">
                    <p className="w-4 h-4 bg-red-500"></p>
                    <span className="text-[12px] text-gray-600/65">
                      Talabadan jarima sabab ajratilan coin !
                    </span>
                  </article>
                </article>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <article className="flex items-center gap-5 mb-5">
            <button className={`px-3 py-1 rounded-md transition-all duration-200 ${activeTab === "payments"
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-black"
              }`} onClick={() => setActiveTab("payments")}>To&apos;lovlar</button>
            <button onClick={() => setActiveTab("coins")}
              className={`px-3 py-1 rounded-md transition-all duration-200 ${activeTab === "coins"
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-black"
                }`}
            >Coinlar</button>
          </article>
          {activeTab === "payments" && (
            <div className="w-full">
              {student.payments && student.payments.length > 0 ? (
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="p-2 border">#</th>
                      <th className="p-2 border">Summa</th>
                      <th className="p-2 border">Turi</th>
                      <th className="p-2 border">Sana</th>
                      <th className="p-2 border">Keyingi to‘lov</th>
                      <th className="p-2 border">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.payments.map((payment: any, idx: number) => (
                      <tr key={idx} className="odd:bg-white even:bg-gray-50">
                        <td className="p-2 border">{idx + 1}</td>
                        <td className="p-2 border">
                          {payment.amount.toLocaleString("uz-UZ")} so‘m
                        </td>
                        <td className="p-2 border">{payment.type}</td>
                        <td className="p-2 border">
                          {new Date(payment.date).toLocaleDateString("uz-UZ")}
                        </td>
                        <td className="p-2 border">
                          {new Date(payment.nextPayment).toLocaleDateString("uz-UZ")}
                        </td>
                        <td className="p-2 border">{payment.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="w-full h-[200px] flex items-center justify-center text-gray-500 text-base font-medium">
                  <p className="text-gray-500/50 text-[14px] my-5 underline">
                    To'lovlar tarixi mavjud
                  </p>
                </div>
              )}
            </div>
          )}


          {activeTab === "coins" && (
            <div className="p-4 text-center col-span-2 rounded-lg shadowCustom">
              <p className="mb-6">Studentning Coinlar tarixi</p>
              <div className="w-full">
                <div className="flex justify-end mb-5">
                  <SelecStatus
                    selectStatus={selectStatus}
                    onSelectChange={setSelectStatus}
                  />
                </div>
                {totalCoins < 1 ? (
                  <p className="text-gray-500/50 text-[14px] my-5 underline">
                    Coinlar tarixi mavjud
                  </p>
                ) : (
                  <div className="w-full flex flex-col gap-2 items-center">
                    <div className="flex w-full py-2 px-4 border-b items-center  mb-3">
                      <article className="flex-[0.4] text-left ">
                        <p className="max-sm:text-[13px] text-[14px]">Status</p>
                      </article>
                      <article className="flex-1 text-centre">
                        <p className="max-sm:text-[13px] text-[14px]">Sabab</p>
                      </article>
                      <article className="flex-1 text-center ">
                        <p className="max-sm:text-[13px] text-[14px]">Sana</p>
                      </article>
                      <article className="flex-1 text-right mr-4">
                        <p className="max-sm:text-[13px] text-[14px]">Coin</p>
                      </article>
                      <article className="flex-1 text-right mr-4">
                        <p className="max-sm:text-[13px] text-[14px]">Option</p>
                      </article>
                    </div>
                    {filteredCoins?.map((coin, index) => (
                      <div
                        key={index}
                        className={`flex w-full py-2 px-4 items-center rounded-md mb-3 ${coin.reason.includes("Coin almashtirildi !")
                          ? "bg-orange-400/30"
                          : coin.value < 0
                            ? "bg-red-500/30"
                            : "bg-green-300/30"
                          }`}
                      >
                        <article className="flex-[0.4]">
                          <CircleCheckBig
                            className={`stroke-[1.5] w-5 h-5 max-md:w-[16px] ${coin.reason.includes("Coin almashtirildi !")
                              ? "stroke-orange-500"
                              : coin.value > 0
                                ? "stroke-green-500"
                                : "stroke-red-500"
                              }`}
                          />
                        </article>
                        <article className="flex-1 text-start">
                          <article className="flex max-sm:flex-col gap-2 items-center">
                            {coin.reason.map((reason: any, index: number) => (
                              <p
                                key={index}
                                className={`text-[10px] text-black px-3 py-1 rounded-2xl bg-accent max-md:text-[7.5px]`}
                              >
                                {formatReasonText(reason)}
                              </p>
                            ))}
                          </article>
                        </article>
                        <article className="flex-1 text-center">
                          <p className="text-gray-500/50 max-md:text-[11px]">
                            {formatDate(coin.date)}
                          </p>
                        </article>
                        <article className="flex-1 justify-items-end text-right">
                          <p
                            className={`flex justify-center items-center w-14 h-6 rounded-3xl text-[14px] text-white bg-green-500 max-md:text-[10px] ${coin.reason.includes("Coin almashtirildi !")
                              ? "bg-orange-500"
                              : coin.value > 0
                                ? "bg-green-500"
                                : "bg-red-500"
                              }`}
                          >
                            {coin.value > 0 ? "+" : ""}
                            {coin.value}
                          </p>
                        </article>
                        <article className="flex-1 justify-items-end">
                          <Delete studentId={student._id} coinId={coin._id} pathname={pathname} />
                        </article>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

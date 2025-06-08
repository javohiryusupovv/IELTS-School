import { getStudentFromCookie } from "@/actions/student.check";
import { formatDate, formatReasonText } from "../../../../../constants/page";
import { Cog  } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CoinSucces() {
  const students = await getStudentFromCookie();
  const historyCoins = students?.coins?.map((coin: any) => {
    return {
      value: coin.value,
      reason: coin.reasons.map((reason: any) => reason.reason),
      date: coin.date,
    };
  });
  console.log(historyCoins);

  const succesCoin = historyCoins?.filter((coin: any) => 
    coin.value > 0 && 
    !coin.reason.some((reason: string) => reason.includes("Coin almashtirildi !"))
  );


  return (
    <div className="w-11/12 m-auto pt-[100px]">
      <article className="w-full">
        <p className="text-[17px] font-semibold text-gray-400 mb-5">
          Qabul qilingan Coinlar
        </p>
        <ul>
          {succesCoin && succesCoin.length > 0 ? (
            <ul>
              {succesCoin.map(
                (coin: any, index: number) =>
                  (
                    <li
                      key={index}
                      className="flex justify-between items-center border-b py-2"
                    >
                      <article className="flex items-center break-words w-[70%] gap-2">
                        {coin.reason.map((reason: any, index: number) => (
                          <p
                            key={index}
                            className="flex justify-center items-center text-[14px] text-black"
                          >
                            {formatReasonText(reason)}
                          </p>
                        ))}
                      </article>
                      <article className="flex flex-col gap-1 justify-start">
                        <p className="flex justify-center items-center w-12 h-5 rounded-3xl text-[12px] text-white bg-green-500 p-2">
                          +{coin.value}
                        </p>
                        <span className="text-[10px] font-normal text-end text-gray-400">
                          {formatDate(coin.date)}
                        </span>
                      </article>
                    </li>
                  )
              )}
            </ul>
          ) : (
            <div className="flex justify-center items-center h-[600px] relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 text-center">
                <Cog className="animate-spin stroke-gray-500" />
                <span className="text-gray-500 text-[14px]">Coinlar topilmadi !</span>
              </div>
            </div>
          )}
        </ul>
      </article>
    </div>
  );
}

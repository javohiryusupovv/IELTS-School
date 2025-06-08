import { getStudentFromCookie } from "@/actions/student.check";
import { formatDate, formatReasonText } from "../../../../../constants/page";
import { Cog } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CoinSpend() {
  const students = await getStudentFromCookie();
  const historyCoins = students?.coins?.map((coin: any) => {
    return {
      value: coin.value,
      reason: coin.reasons.map((reason: any) => reason.reason),
      date: coin.date,
    };
  });

  const spendCoins = historyCoins?.filter((coin: any) =>
    coin.reason.some((reason: string) =>
      reason.includes("Coin almashtirildi !")
    )
  );

  return (
    <div className="w-11/12 m-auto pt-[100px]">
      <article className="w-full">
        <p className="text-[17px] font-semibold text-gray-400 mb-10">
          Sarflangan Coinlar
        </p>
        {spendCoins && spendCoins.length > 0 ? (
          <ul>
            {spendCoins.map((coin: any, index: number) => (
              <li
                key={index}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  {coin.reason
                    .filter((reason: any) =>
                      reason.includes("Coin almashtirildi !")
                    )
                    .map((reason: any, idx: number) => (
                      <p key={idx} className="text-[14px]">
                        {formatReasonText(reason)}
                      </p>
                    ))}
                </div>
                <article className="flex flex-col gap-1 justify-start items-end">
                  <p className="flex justify-center items-center w-12 h-5 rounded-3xl text-[12px] text-white bg-orange-500 p-2">
                    {coin.value > 0 ? "+" : ""}
                    {coin.value}
                  </p>
                  <span className="text-[10px] font-normal text-gray-400">
                    {formatDate(coin.date)}
                  </span>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-center items-center h-[600px] relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 text-center">
              <Cog className="animate-spin stroke-gray-500" />
              <span className="text-gray-500 text-[14px]">
                Sarflangan coinlar topilmadi!
              </span>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

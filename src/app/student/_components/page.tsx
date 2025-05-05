import { IStudent } from "@/types/type";
import { formatDate, formatReasonText } from "../../../../constants/page";

interface Props {
  student: IStudent;
}

export default function HistoryCoins({ student }: Props) {
  console.log(student);
  const historyCoins = student?.coins?.map((coin: any) => {
    return {
      value: coin.value,
      reason: coin.reasons.map((reason: any) => reason.reason),
      date: coin.date,
    };
  });

  return (
    <div className="w-full">
      <table className="w-full">
        <caption className="mb-4">Coinlar jadvali</caption>
        <tbody className="">
          <tr className="text-left border-b">
            <th className="text-[13px] py-3">Sabab</th>
            <th className="text-[13px] py-3">Sana</th>
            <th className="text-[13px] py-3">Coin</th>
          </tr>
          {historyCoins?.map((coin, index) => (
            <tr key={index} className="border-b">
              <td className="flex items-center gap-2 py-2">
                {coin.reason.map((reason: any, index: number) => (
                  <p
                    key={index}
                    className={`text-[10px] text-white px-3 py-1 rounded-2xl ${
                      reason.includes("Coin almashtirildi !")
                        ? "bg-orange-500"
                        : coin.value > 0
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {formatReasonText(reason)}
                  </p>
                ))}
              </td>
              <td className="text-gray-500/50 text-[12px] py-2">
                {formatDate(coin.date)}
              </td>
              <td>
                <p
                  className={`flex justify-center items-center w-12 h-5 rounded-3xl text-[12px] text-white bg-green-500 p-2 ${
                    coin.reason.includes("Coin almashtirildi !")
                      ? "bg-orange-500"
                      : coin.value > 0
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {coin.value > 0 ? "+" : ""}
                  {coin.value}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { IStudent } from "@/types/type";
import MenyuCoin from "./action";

interface Props {
  student: IStudent;
}

export default function HistoryCoins({ student }: Props) {
  return (
    <div className="w-full">
        <MenyuCoin />
    </div>
  );
}
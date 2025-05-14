import Image from "next/image";
import { PiCrownLight } from "react-icons/pi";
import AccountImg from "../../../../../public/accountImg/azizbek.jpg";
import Erik from "../../../../../public/icons/erik.png"
import { GiCrown } from "react-icons/gi";

interface StudentType {
  name: string;
  surname: string;
  total: number;
}

interface SortProps {
  studentsSort: StudentType[];
}

const medalColors = [
  {
    bg: "bg-yellow-400/40",
    border: "border-[#FFD700]",
    crownColor: "text-[#FFD700]",
    badgeColor: "bg-[#ffb957]",
    icon: (
      <GiCrown className="leader absolute right-5 -top-[34px] w-10 h-10 text-[#FFD700]" />
    ),
  },
  {
    bg: "bg-gray-400/80",
    border: "border-[#C0C0C0]",
    crownColor: "text-[#C0C0C0]",
    badgeColor: "bg-[#9e9e9e]",
    icon: (
      <PiCrownLight className="absolute left-0 -top-[30px] -rotate-[20deg] text-[#C0C0C0] w-10 h-10" />
    ),
  },
  {
    bg: "bg-orange-300/80",
    border: "border-[#CD7F32]",
    crownColor: "text-[#CD7F32]",
    badgeColor: "bg-[#ce7430]",
    icon: (
      <PiCrownLight className="absolute right-0 -top-[30px] rotate-[20deg] text-[#CD7F32] w-10 h-10" />
    ),
  },
];

export default function LeaderBoardPages({ studentsSort }: SortProps) {
  const topThree = studentsSort.slice(0, 3);
  return (
    <div className="m-auto">
      <div className="flex justify-between gap-2 w-full mb-4 h-[230px] container-leaderboard">
        {[1, 0, 2].map((pos, i) => {
          const student = topThree[pos];
          const styles = medalColors[pos];

          return (
            <div
              key={i}
              className={`leader-card flex justify-center items-center relative ${
                pos === 0 ? "top-10" : "top-20"
              } left-0 w-[130px] h-[150px] ${styles.bg} rounded-t-3xl`}
            >
              <article
                className={`absolute z-[1] -top-10 ${
                  pos === 2 ? "right-6 max-leaderContainer:right-3" : pos === 0 ? "left-[21%] max-leaderContainer:left-[16%]" : "left-[24px] max-leaderContainer:left-[15px]"
                } w-20 h-20 border-2 rounded-full ${styles.border}`}
              >
                {styles.icon}
                <Image
                  className="absolute left-0 top-0 rounded-full object-cover z-[1]"
                  src={Erik}
                  alt="LeaderBoard Img"
                />
                <span
                  className={`flex justify-center items-center absolute left-[30px] -bottom-2 z-[2] w-[20px] h-[20px] rounded-full text-white text-[12px] font-semibold ${styles.badgeColor}`}
                >
                  {pos + 1}
                </span>
              </article>
              <article className="text-center mt-5 text-white absolute flex flex-col items-center">
                <p className="text-[14px] font-semibold titleTop">
                  {student.surname.slice(0, 1)}. {student.name}
                </p>
                <p className="text-[12px] font-semibold flex items-center gap-2 justify-center">
                  🟡 {student.total}
                </p>
              </article>
            </div>
          );
        })}
      </div>

      <ul className="w-full grid grid-cols-1 gap-3">
        {studentsSort.slice(3, 10).map((student, index: number) => (
          <li
            key={index}
            className="bg-accent border-[0.7px] py-2 rounded-lg flex items-center justify-between px-5 cursor-pointer"
          >
            <article className="flex items-center gap-5 ">
              <span className="text-[18px] font-bold text-orange-500">
                {index + 4}
              </span>
              <article className="flex items-center gap-3">
                <Image
                  className="w-10 h-10 rounded-full"
                  src={Erik}
                  alt="AccountImg LeaderBoard"
                />
                <p className="text-[15px] font-semibold">
                  {student.surname} {student.name}
                </p>
              </article>
            </article>
            <article className="flex items-center gap-1">
              🟡
              <span>{student.total}</span>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

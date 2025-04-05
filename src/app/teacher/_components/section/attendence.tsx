"use client";

import { addCoins } from "@/actions/student.action";
import moment from "moment";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ChevronRight, ChevronLeft } from 'lucide-react';


interface Props {
  students: any;
  days: string[],
  titleCourse: string,
  teacherName: string
}

export default function Attendence({ students, days, titleCourse, teacherName }: Props) {
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [isPending, startTransition] = useTransition();

  // Hozirgi oy va yilni boshlang'ich qiymati
  const [currentMonth, setCurrentMonth] = useState(moment(days[0]).month());
  const [currentYears, setCurrentYears] = useState(moment(days[0]).year());
  const filterDays = days.filter((day) => moment(day).month() === currentMonth && moment(day).year() === currentYears)
  const nextMonth = () => {
    const nextDate = moment().year(currentYears).month(currentMonth).add(1, 'month');
    if (days.some(day => moment(day).month() === nextDate.month() && moment(day).year() === nextDate.year())) {
      setCurrentMonth(nextDate.month())
      setCurrentYears(nextDate.year())
    }
  }

  const prevMonth = () => {
    const prevDate = moment().year(currentYears).month(currentMonth).subtract(1, 'month');
    if (days.some(day => moment(day).month() === prevDate.month() && moment(day).year() === prevDate.year())) {
      setCurrentMonth(prevDate.month())
      setCurrentYears(prevDate.year())
    }
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, studentId: string) => {
    const newValue = e.target.value;

    // Faqat raqamlarni qabul qiladi va uzunligi 2 tadan oshmaydi
    if (/^\d{0,2}$/.test(newValue)) {
      setInputValues((prev) => ({
        ...prev,
        [studentId]: newValue, // Har bir student uchun alohida input qiymatini saqlash
      }));
    }
  };

  const handleAdd = (studentId: string) => {
    const coinValue = inputValues[studentId] ? parseInt(inputValues[studentId]) : 0;

    if (coinValue > 0) {
      startTransition(async () => {
        const result = await addCoins(studentId, coinValue)
        if (result.success) {
          toast.success("Coin qushildi")
        } else {
          toast.error("Coin qushilmadi !!!")
        }
        setInputValues(prev => ({ ...prev, [studentId]: "" }));
      })
    }
  };

  return (
    <div className="p-4">
      <div className="flex w-full flex-col">
        <article className="flex items-center gap-3 mb-7">
          <p className="w-[6] h-[6] rounded-full bg-orange-400"></p>
          <h6 className="flex gap-3 items-center text-[25px]">{titleCourse} <p className="w-[6] h-[6] rounded-full bg-orange-400"></p> {teacherName}</h6>
        </article>
        <div className="flex items-center justify-end mr-10 gap-4 mb-5">
          <button onClick={prevMonth} className="flex items-center py-[2px] px-2 border rounded-sm  focus:bg-orange-500 bg-[#ffa600b8]"><ChevronLeft className="stroke-white stroke-1 w-[18] h-[18px]" /></button>
          <p>{moment().month(currentMonth).format("MMMM").slice(0, 3).toLowerCase()} {currentYears}</p>
          <button onClick={nextMonth} className="flex items-center py-[2px] px-2 border rounded-md focus:bg-orange-500 bg-[#ffa600b8]"><ChevronRight className="stroke-white stroke-1 w-[18] h-[18px]" /></button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <div className="border col-span-1"></div>
        <div className="col-span-3 overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead className="overflow-x-auto w-full whitespace-nowrap border-t border-b">
                <tr className="text-left whitespace-nowrap">
                  <th className="w-[200px] sticky left-0 z-[10] bg-white">
                    <p className="text-[15px] font-medium py-2">Ism</p>
                  </th>
                  {filterDays.map((month, i) => (
                    <th key={i} className="text-[12px] p-3">
                      {moment(month).format("D-MMM")}
                    </th>
                  ))}
                  <th className="w-[100px] text-center">
                    <p className="w-[100px]">Coins</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student: any, id: number) => (
                  <tr key={id} className="border-b-[0.3px]">
                    <th className="w-[200px] sticky left-0 z-[10] bg-white">
                      <div className="w-[200px] text-left py-3">
                        <p className="text-[12px] overflow-hidden whitespace-nowrap text-ellipsis font-medium">
                          {student.surname} {student.name}
                        </p>
                      </div>
                    </th>
                    {filterDays.map((day, i) => {
                      const formatDay = moment(day).startOf('day').format("YYYY-MM-DD");
                      const coinGiven = student.coins.some((coin: any) => {
                        const coinDate = moment(coin.date).format("YYYY-MM-DD");
                        return coinDate === formatDay;
                      });
                      console.log(coinGiven);
                      

                      return (
                        <td key={i} className="text-[12px] p-4">
                          {coinGiven ? (
                            <span className="text-white py-1 px-5 bg-orange-400 rounded-md cursor-pointer">✓</span>
                          ) : (
                            <span className="text-white py-1 px-5 rounded-md cursor-pointer border">–</span>
                          )}
                        </td>
                      );
                    })
                    }
                    <td className="w-[100px] flex items-center gap-2 p-3">
                      <input
                        value={inputValues[student._id] || ""}
                        onChange={(e) => handleChange(e, student._id)}
                        type="text"
                        className="w-[45px] px-3 py-1 border outline-none rounded-md"
                      />
                      <button onClick={() => handleAdd(student._id)} className="p-1 border rounded-sm cursor-pointer text-[13px] text-white bg-red-500">add</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

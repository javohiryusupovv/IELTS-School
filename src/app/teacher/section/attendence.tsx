"use client";

import { addCoins } from "@/actions/student.action";
import moment from "moment";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  students: any;
  days: string[]
}

export default function Attendence({ students, days}: Props) {
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [isPending, startTransition] = useTransition();
  const filterStudent = students[1];
  const sliceTitle = filterStudent?.courseTitle?.split(" ")[0] || "";
  

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

    if(coinValue > 0){
        startTransition(async()=> {
            const result = await addCoins(studentId, coinValue)
            if(result.success){
                toast.success("Coin qushildi")
            }else{
                toast.error("Coin qushilmadi !!!")
            }
            setInputValues(prev => ({ ...prev, [studentId]: "" }));
        })
    }
  };

  return (
    <div className="p-4">
      <h6 className="mb-7 text-[25px]">{sliceTitle} - Yusupov Javohir</h6>
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
                  {days.map((month, i) => (
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
                {filterStudent?.students.map((student: any, id: number) => (
                  <tr key={id} className="border-b-[0.3px]">
                    <th className="w-[200px] sticky left-0 z-[10] bg-white">
                      <div className="w-[200px] text-left py-3">
                        <p className="text-[12px] overflow-hidden whitespace-nowrap text-ellipsis font-medium">
                          {student.surname} {student.name}
                        </p>
                      </div>
                    </th>
                    {days.map((_, i) => (
                      <td key={i} className="text-[12px] p-4">
                        <span className="text-white py-1 px-3 bg-orange-400 rounded-md cursor-pointer">bor</span>
                      </td>
                    ))}
                    <td className="w-[100px] flex items-center gap-2 p-3">
                      <input
                        value={inputValues[student._id] || ""}
                        onChange={(e) => handleChange(e, student._id)}
                        type="text"
                        className="w-[45px] px-3 py-1 border outline-none rounded-md"
                      />
                      <button onClick={()=> handleAdd(student._id)} className="p-1 border rounded-sm cursor-pointer text-[13px] text-white bg-red-500">add</button>
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

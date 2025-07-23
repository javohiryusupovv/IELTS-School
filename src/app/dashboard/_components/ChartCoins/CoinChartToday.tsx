"use client";

import { useEffect, useState } from "react";
import { getTodayCoins } from "@/actions/statistik.action";
import { GiTwoCoins } from "react-icons/gi";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { downloadExcel } from "@/lib/xlsFile";

type ChartData = {
  name: string;
  surname: string;
  coins: number;
  course: string;
};

export default function   CoinChartToday() {
  const [data, setData] = useState<ChartData[]>([]);
  const totalCoins = data.reduce((sum, item) => sum + item.coins, 0);
  useEffect(() => {
      const fetchData = async () => {
        const result = await getTodayCoins();
        setData(result.map((item: any) => ({ surname: "", ...item })));
    };
    fetchData();
  }, []);
  

  return (
    <div className="xl:w-[76%] w-full h-[400px]">
      <h2 className="text-xl font-bold mb-4">Bugun Sarflangan Coinlar</h2>
      <ResponsiveContainer width="100%" height={300}> 
        <AreaChart
          data={data}
          syncId="coin"
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={false} axisLine={false}/>
          <YAxis />
          <Tooltip />
          <Area  type="monotone" dataKey="coins" stroke="#ffa92d" fill="#ffa92d" dot={{ stroke: '#ffa92d', strokeWidth: 2, fill: 'white', r: 3 }} />
        </AreaChart>
      </ResponsiveContainer>
      <article className="flex items-center justify-between">
        <p className="text-[18px] text-gray-600 flex items-center gap-2">
          Umumiy sarflangan coinlar:{" "}
          <span className="font-semibold text-orange-500 text-[18px]">{totalCoins}</span>
          <GiTwoCoins className="w-7 h-7 fill-gray-400"/>
        </p>
        <button onClick={() => downloadExcel(data)}  className="px-2 w-[100px] hover:bg-orange-400/80 transition-all duration-200 py-1 border rounded-lg cursor-pointer bg-orange-400 text-white border-transparent">Excel</button>
      </article>
    </div>
  );
}

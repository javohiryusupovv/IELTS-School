"use client";

import { useEffect, useState } from "react";
import { getTodayCoins } from "@/actions/statistik.action";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartData = {
  name: string;
  coins: number;
  course: string;
};

export default function CoinChartToday() {
  const [data, setData] = useState<ChartData[]>([]);
  
  useEffect(() => {
      const fetchData = async () => {
        const result = await getTodayCoins();
        setData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="w-[76%] h-[400px]">
      <h2 className="text-xl font-bold mb-4">Bugun Sarflangan Coinlar</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          syncId="coin"
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="coins" stroke="#ffa92d" fill="#ffa92d" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

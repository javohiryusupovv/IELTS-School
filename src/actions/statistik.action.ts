"use server";

import ConnectMonogDB from "@/lib/mongodb";
import { Student } from "@/models";

type Coin = {
  value: number;
  date: string;
  reasons: { reason: string; value: number }[];
};

export async function getTodayCoins(): Promise<
  { name: string; coins: number; course: string }[]
> {
  await ConnectMonogDB();

  const todayStr = new Date().toISOString().slice(0, 10); // "2025-07-22"

  const students = await Student.find({ "coins.date": todayStr })
    .select("name surname coins course")
    .populate("course", "courseTitle"); // faqat courseTitle ni olib kelamiz

  const result = students.map((student: any) => {
    const coinsToday = student.coins
      .filter((c: Coin) => c.date === todayStr)
      .reduce((sum: number, c: Coin) => sum + c.value, 0);

    return {
      name: student.name,
      surname: student.surname,
      coins: coinsToday,
      course: student.course?.courseTitle || "Nomaʼlum"
    };
  });

  return result;
}

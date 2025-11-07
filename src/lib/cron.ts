// lib/cron.ts
import cron from "node-cron";
import Student from "@/models/student.model";
import ConnectMongoDB from "@/lib/mongodb";

let cronStarted = false;

export const startCron = () => {
  // Cron faqat bir marta ishga tushishini ta'minlaymiz
  if (cronStarted) return;
  cronStarted = true;

  // Har kuni soat 00:00 da ishga tushadi
  cron.schedule("0 0 * * *", async () => {
    console.log("⏰ [CRON] Oylik qarzdorlik tekshiruvi boshlandi...");
    try {
      await ConnectMongoDB();

      const today = new Date();
      const students = await Student.find({ paymentNext: { $lte: today } }).populate("course");

      for (const student of students) {
        if (!student.course?.price) continue;

        // 🔹 Qarzdor yozuvini qo‘shamiz
        student.payments.push({
          amount: student.course.price,
          type: "Naqd",
          date: new Date(student.paymentNext),
          status: "qarzdor",
        });

        // 🔹 Balansdan kurs narxini ayrish
        student.balance -= student.course.price;

        // 🔹 Keyingi oyga o'tkazamiz
        const next = new Date(student.paymentNext);
        next.setMonth(next.getMonth() + 1);
        student.paymentNext = next;

        await student.save();
      }

      console.log(`💰 [CRON] ${students.length} ta student uchun qarzdorlik yangilandi.`);
    } catch (error) {
      console.error("❌ [CRON] Xatolik:", error);
    }
  });

  console.log("✅ [CRON] Har kuni 00:00 da ishlaydigan cron ishga tushdi.");
};

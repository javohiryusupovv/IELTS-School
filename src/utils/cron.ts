import cron from "node-cron";
import Student from "@/models/student.model";
import ConnectMonogDB from "@/lib/mongodb";

export function startCronJobs() {
  cron.schedule("0 0 1 * *", async () => {
    try {
      await ConnectMonogDB();
      const students = await Student.find().populate("course");

      for (const student of students) {
        if (student.course?.price) {
          student.balance -= student.course.price;
          await student.save();
        }
      }

      console.log("✅ Oylik balans yangilandi");
    } catch (err) {
      console.error("❌ Cron job error:", err);
    }
  });
}

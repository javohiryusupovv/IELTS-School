import Marquee from "react-fast-marquee";
import { Banknote, CalendarClock } from "lucide-react";
import { lastPaymentDate } from "../../../../constants/page";
import { getPayments } from "@/actions/crmaccount.action";


export default async function PaymentSend() {
  const paymentLastDate = await getPayments();
  console.log(paymentLastDate);
  
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - lastPaymentDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysremind = 30 - diffDays;
  const showMarquee = diffDays >= 25 && diffDays <= 30;
  return (
    <div>
      {showMarquee && (
        <Marquee
          className="mb-4"
          direction="right"
          speed={50}
          gradient
          gradientColor="#f0f1f2"
        >
          <article className="flex items-center gap-32 max-studentCard:gap-5 py-[5px]">
            <p className="flex items-center gap-2 text-red-600 font-medium text-[14px] max-studentCard:text-[10px]">
              <Banknote className="text-green-500" /> To'lov qilish vaqti keldi
            </p>
            <p className="flex items-center gap-2 text-red-600 font-medium text-[14px] max-studentCard:text-[10px]">
              <Banknote className="text-green-500" /> To'lov qilish vaqti keldi
            </p>
            <p className="flex items-center gap-2 text-red-600 font-medium text-[14px] max-studentCard:hidden">
              <Banknote className="text-green-500" /> To'lov qilish vaqti keldi
            </p>
            <p className="flex items-center gap-2 text-red-600 font-medium text-[14px] max-studentCard:hidden">
              <Banknote className="text-green-500" /> To'lov qilish vaqti keldi
            </p>
          </article>
        </Marquee>
      )}
      {showMarquee && (
        <p className="flex items-center gap-2 text-red-600 underline font-medium text-[14px] max-studentCard:text-xs">
          <CalendarClock className="stroke-1 text-red-700 w-5 h-5" />
          {daysremind > 0
            ? `Yana ${daysremind} kun qoldi — oxirgi kun: ${new Date(
                new Date(lastPaymentDate).setDate(
                  lastPaymentDate.getDate() + 30
                )
              ).toLocaleDateString("uz-UZ")}`
            : `Obuna muddati tugadi !`}
        </p>
      )}

      {/* <p className="flex items-center gap-2 text-red-600 underline font-medium text-[14px]"><CalendarClock className="stroke-1 text-red-700 w-5 h-5"/> 30.06.2025 Oxirgi kun to'lovni</p> */}
    </div>
  );
}

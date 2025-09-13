"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { GoPlus } from "react-icons/go";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NumericFormat } from "react-number-format";
import { addPayment } from "@/actions/student.action";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

// 🟢 server actionni import qilamiz

interface PayModalProps {
  student: {
    _id: string;
    name: string;
    surname: string;
    course?: { courseTitle: string };
  };
}

export default function PayModal({ student }: PayModalProps) {
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];
  const pathname = usePathname()

  const nextPayment = new Date(today);
  nextPayment.setMonth(today.getMonth() + 1);
  const formattedNextPayment = nextPayment.toISOString().split("T")[0];
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = useState<"Naqd" | "Karta">("Naqd");

  const handlePayment = async () => {
  try {
    if (!price) {
      toast.error("❌ Iltimos summani kiriting!");
      return;
    }

    setLoading(true);

    const paymentPromise = addPayment(student._id, {
      amount: Number(price),
      type: paymentType,
    }, pathname);

    toast.promise(paymentPromise, {
      loading: "💸 To‘lov amalga oshirilmoqda...",
      success: {
        message: "✅ To‘lov muvaffaqiyatli amalga oshirildi!",
        duration: 2500,
        style: {
          height: "50px",
          color: "green",
          border: "1px solid #17be5a",
          backgroundColor: "white",
        },
      },
      error: "❌ Xatolik yuz berdi, qayta urinib ko‘ring!",
    });

    await paymentPromise;
  } catch (err) {
    console.error("❌ Xatolik:", err);
  } finally {
    setLoading(false);
  }
};
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-500 cursor-pointer">
            <GoPlus className="w-5 h-5 text-white" />
          </span>
        </AlertDialogTrigger>

        <AlertDialogContent className="max-sm:w-[400px] max-sm:rounded-md max-sidebar:w-[320px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[16px] font-semibold">
              To‘lov qilish oynasi
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 text-[14px]">
              Iltimos, quyidagi ma’lumotlarni to‘ldiring va to‘lov turini tanlang.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-3 my-4 text-[14px]">
            <div className="flex justify-between">
              <span className="font-medium">Talaba:</span>
              <span>
                {student.name} {student.surname}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Kurs:</span>
              <span>{student.course?.courseTitle}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Narxi:</span>
              <NumericFormat
                value={price}
                thousandSeparator=","
                allowNegative={false}
                placeholder="Summani kiriting"
                onValueChange={(values) => setPrice(values.value)}
                className="border rounded-md px-2 py-1 w-[150px] text-[14px] focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">To‘lov turi:</span>
              <Select value={paymentType} onValueChange={(val: "Naqd" | "Karta") => setPaymentType(val)}>
                <SelectTrigger className="w-[150px] h-8 text-[14px]">
                  <SelectValue placeholder="Tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Naqd">Naqd</SelectItem>
                  <SelectItem value="Karta">Karta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Bugungi sana:</span>
              <span>{formattedToday}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Keyingi to‘lov:</span>
              <span className="text-green-600 font-semibold">
                {formattedNextPayment}
              </span>
            </div>
          </div>

          <AlertDialogFooter className="max-sm:gap-2">
            <AlertDialogCancel disabled={loading}>Bekor qilish</AlertDialogCancel>
            <AlertDialogAction disabled={loading} onClick={handlePayment}>
              {loading ? "Yuborilmoqda..." : "To‘lovni tasdiqlash"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

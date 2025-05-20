import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Props {
  paymentDay: Date | null;
  setPaymentDay: (date: Date | null) => void;
}

export function CalendarPayment({ paymentDay, setPaymentDay }: Props) {
  const selectedDate = paymentDay ?? new Date();

  return (
    <Popover>
      <PopoverTrigger
        type="button"
        className={cn(
          "sm:w-[200px] [&_svg]:size-4 [&_svg]:shrink-0 w-full flex border whitespace-nowrap items-center gap-2 p-2 rounded-md text-left font-normal focus-within:border-orange-500 overflow-hidden",
          !paymentDay && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="w-[8px] h-[8px]" />
        {paymentDay
          ? format(selectedDate, "yyyy-MM-dd") // ✅ to‘g‘rilangan format
          : <span>To'lov kunini kiriting</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={paymentDay || new Date()}
          onSelect={(date) => setPaymentDay(date ?? new Date())}
        />
      </PopoverContent>
    </Popover>
  );
}

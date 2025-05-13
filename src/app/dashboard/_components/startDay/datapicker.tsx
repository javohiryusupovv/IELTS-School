
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Props {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
}

export function Datapicker({ startDate, setStartDate }: Props) {
  return (
    <Popover>
      <PopoverTrigger type="button" className={cn("sm:w-[155px] [&_svg]:size-4 [&_svg]:shrink-0 w-full flex border whitespace-nowrap items-center gap-2 p-2 rounded-md text-left font-normal focus-within:border-orange-500 overflow-hidden",!startDate && "text-muted-foreground" )}>
          <CalendarIcon className="w-[8px] h-[8px]" />
          {startDate ? format(startDate, "PPP") : <span>Boshlanish kuni</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={startDate || undefined} // Agar null bo'lsa, undefined yuboramiz
          onSelect={(date) => setStartDate(date ?? null)} // Agar undefined bo'lsa, nullga aylantiramiz
        />
      </PopoverContent>
    </Popover>
  );
}

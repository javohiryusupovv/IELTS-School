import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Props {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
}

export function Datapicker({ startDate, setStartDate }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[145px] justify-start text-left font-normal px-1 overflow-hidden",
            !startDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="w-[10px] h-[10px]" />
          {startDate ? format(startDate, "PPP") : <span>Boshlanish kuni</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={startDate || undefined} // Agar null bo'lsa, undefined yuboramiz
          onSelect={(date) => setStartDate(date ?? null)} // Agar undefined bo'lsa, nullga aylantiramiz
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface Props {
  filterDay: (dayType: string) => void,
  selectDay: string
}

export default function OddEvenDayFilter({ selectDay, filterDay }: Props) {
  return (
    <div className="mb-5">
      <label
        className="flex gap-2 text-[#d47323cd] flex-col mb-1"
        htmlFor="kurs"
      >
        Dars kunlari*
      </label>
        <Select value={selectDay} onValueChange={(filterDay)}>
          <SelectTrigger>
            <SelectValue placeholder="Kunni tanlang"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="toq" className="max-sm:text-[14px] hover:bg-orange-400/70  hover:text-white transition-all duration-200">Toq kun</SelectItem>
            <SelectItem value="juft" className="max-sm:text-[14px] hover:bg-orange-400/70  hover:text-white transition-all duration-200">Juft kun</SelectItem>
          </SelectContent>
        </Select>
    </div>
  )
}

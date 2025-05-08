"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Props {
    selectStatus: string;
    onSelectChange: (value: string) => void
  }

export default function SelecStatus({selectStatus, onSelectChange}: Props) {
    return (
        <div>
            <Select value={selectStatus} onValueChange={onSelectChange}>
                <SelectTrigger  className={`w-[180px] ${selectStatus === "added" && "border-green-500" || selectStatus === "penalty" && "border-red-600" || selectStatus === "used" && "border-orange-500"}`}>
                    <SelectValue placeholder="Statusni tanlang..."  className={`${selectStatus === "added" ? "text-green-500" : selectStatus === "penalty" ? "text-red-600" : selectStatus === "used" ? "text-orange-500" : "text-black"}`}/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="all">Barchasi</SelectItem>
                        <SelectItem value="added" className="text-green-500">Qo'shilgan Coin</SelectItem>
                        <SelectItem value="penalty" className="text-red-600">Jarima coin</SelectItem>
                        <SelectItem value="used" className="text-orange-500">Sarflangan Coin</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

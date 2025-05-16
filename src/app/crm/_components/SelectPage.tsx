"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectPage() {
  const [selectedValue, setSelectedValue] = useState("")

  return (
    <div className="space-y-4">
      <Select value={selectedValue} onValueChange={setSelectedValue}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="france">France</SelectItem>
            <SelectItem value="germany">Germany</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* {selectedValue && (
        <div className="text-sm">
          Selected country: <span className="font-medium">{selectedValue}</span>
        </div>
      )} */}
    </div>
  )
}

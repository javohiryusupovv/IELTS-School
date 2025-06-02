"use client";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";

export default function Edit() {
  const router = useRouter();

  return (
    <div className="min-h-scree p-4 space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <button onClick={() => router.back()} className="text-gray-300">
          Back
        </button>
        <h1 className="font-bold">Profilni tahrirlash</h1>
        <div></div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm">F.I.SH:</label>
          <input
            type="text"
            name="fullName"
            className="w-full rounded-lg p-2 mt-1 outline-none focus:border-[#3978ff] focus:shadow-sm focus:shadow-[#0000ff22] transition-all duration-200"
            placeholder="Ismingizni kiriting"
          />
        </div>
        {/* <div>
          <label className="block text-sm">Hudud</label>
          <select
            name="region"
            className="w-full rounded-lg p-2 mt-1"
          >
            <option value="">Hududingizni tanlang</option>
            <option value="Toshkent">Toshkent</option>
            <option value="Qashqadaryo">Qashqadaryo</option>
            <option value="Andijon">Andijon</option>
          </select>
        </div> */}
        <Label className="block text-sm">Hudud</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Hududingizni tanlang" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Hudud</SelectLabel>
              <SelectItem value="apple">Qashqadaryo</SelectItem>
              <SelectItem value="banana">Toshkent</SelectItem>
              <SelectItem value="blueberry">Buxoro</SelectItem>
              <SelectItem value="grapes">Andijon</SelectItem>
              <SelectItem value="pineapple">Xorazim</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* */}
        <div>
          <label className="block text-sm">Phonenumber</label>
          <input
            type="number"
            name="phonenumber"
            className="w-full rounded-lg p-2 mt-1 outline-none focus:border-[#3978ff] focus:shadow-sm focus:shadow-[#0000ff22] transition-all duration-200"
            placeholder="Telfon raqamingizni kiriting"
          />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input
            type="text"
            name="password"
            className="w-full rounded-lg p-2 mt-1 outline-none focus:border-[#3978ff] focus:shadow-sm focus:shadow-[#0000ff22] transition-all duration-200"
            placeholder="Passworingizni kiriting"
          />
        </div>
        <button className="w-full bg-orange-500/80 text-white active:scale-105 font-bold py-2 rounded-lg">
          Saqlash
        </button>
      </div>
    </div>
  );
}

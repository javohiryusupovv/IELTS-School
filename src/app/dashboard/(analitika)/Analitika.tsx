"use client";

import Talabalar from "./_components/_students"
import Mentorlar from "./_components/_mentors"
import Filiallar from "./_components/_filiallar"

export default function Analitika() {
  return (
    <div>
      <p className="mb-[16px] font-semibold text-[20px]">Analitika</p>
      <div className="grid grid-cols-3 gap-4">
        <Talabalar/>
        <Mentorlar/>
        <Filiallar/>
      </div>
    </div>
  )
}

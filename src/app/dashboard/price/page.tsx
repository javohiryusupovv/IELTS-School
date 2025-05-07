
import Image from "next/image"
import CheckIcons from "../../../../public/icons/check.png"


export default function page() {
  return (
    <div>
        <div className="grid grid-cols-4 gap-3 w-full">
          <div className="bg-[#f3ad2b] rounded-3xl p-5">
            <h6 className="text-[25px] font-bold text-[#D8FEE5] mb-3">Oddiy</h6>
            <p className="text-[35px] font-bold text-[#D8FEE5] mb-4">499.000 / <span className="text-[16px] font-semibold text-white">oylik</span></p>
            <p className="text-[16p] font-semibold text-white mb-4">Ta'rif haqida</p>
            <ul className="flex flex-col gap-2 mb-14">
              <li className="flex items-center gap-2 text-white">
                <Image src={CheckIcons} alt="Checked icons" />
                50-100 o'quvchi
              </li>
              <li className="flex items-center gap-2 text-white">
                <Image src={CheckIcons} alt="Checked icons" />
                Shop bo'limi
              </li>
              <li className="flex items-center gap-2 text-white">
                <Image src={CheckIcons} alt="Checked icons" />
                O'quvchi Profili
              </li>
            </ul>
            <button className="w-full px-5 py-3 bg-white rounded-[10px] cursor-pointer">To'lov qilish</button>
          </div>
          <div className="bg-[#f3ad2b] rounded-3xl p-5">
            <h6 className="text-[25px] font-bold text-[#D8FEE5] mb-3">O'rta</h6>
            <p className="text-[35px] font-bold text-[#D8FEE5] mb-4">699.000 / <span className="text-[16px] font-semibold text-white">oylik</span></p>
            <p className="text-[16p] font-semibold text-white mb-4">Ta'rif haqida</p>
            <ul className="flex flex-col gap-2 mb-14">
              <li className="flex items-center gap-2 text-white">
                <Image src={CheckIcons} alt="Checked icons" />
                50-100 o'quvchi
              </li>
              <li className="flex items-center gap-2 text-white">
                <Image src={CheckIcons} alt="Checked icons" />
                Shop bo'limi
              </li>
              <li className="flex items-center gap-2 text-white">
                <Image src={CheckIcons} alt="Checked icons" />
                O'quvchi Profili
              </li>
            </ul>
            <button className="w-full px-5 py-3 bg-white rounded-[10px] cursor-pointer">To'lov qilish</button>
          </div>
          <div className="bg-[#f3ad2b] rounded-3xl p-5">
            <h6 className="text-[25px] font-bold text-[#D8FEE5] mb-3">Premium</h6>
            <p className="text-[35px] font-bold text-[#D8FEE5] mb-4">899.000 / <span className="text-[16px] font-semibold text-white">oylik</span></p>
            <p className="text-[16p] font-semibold text-white mb-4">Ta'rif haqida</p>
            <ul className="flex flex-col gap-2 mb-14">
              <li className="flex items-center gap-2 text-white">
                <Image src={CheckIcons} alt="Checked icons" />
                50-100 o'quvchi
              </li>
              <li className="flex items-center gap-2 text-white">
                <Image src={CheckIcons} alt="Checked icons" />
                Shop bo'limi
              </li>
              <li className="flex items-center gap-2 text-white">
                <Image src={CheckIcons} alt="Checked icons" />
                O'quvchi Profili
              </li>
            </ul>
            <button className="w-full px-5 py-3 bg-white rounded-[10px] cursor-pointer">To'lov qilish</button>
          </div>
        </div>
    </div>
  )
}

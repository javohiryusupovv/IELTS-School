import Image from "next/image";
import CheckIcons from "../../../../public/icons/check.png";

export default function page() {
  return (
    <div>
      <h1 className="text-3xl font-bold my-7 ml-12">Prices</h1>
      <div className=" w-[85%] m-auto">
        <div className="grid grid-cols-3 gap-3 w-full">
          <div className="bg-white rounded-xl p-5 border border-transparent transition duration-300 shadow-xl group hover:drop-shadow-orange hover:-translate-y-[10px]">
            <article className="flex-grow">
              <h6 className="text-[25px] font-bold text-black mb-3">Oddiy</h6>
              <p className="text-[35px] font-bold text-black mb-4">
                499.000 /{" "}
                <span className="text-[16px] font-semibold text-black">
                  oylik
                </span>
              </p>
              <button className="w-full px-5 py-3 bg-transparent border-[2px] group-hover:bg-black transition duration-300 group-hover:text-white rounded-[10px] cursor-pointer mb-6">
                To'lov qilish
              </button>
              <p className="text-[16p] font-semibold text-black mb-4">
                Ta'rif haqida
              </p>
              <ul className="flex flex-col gap-2 mb-12 text-black">
                <li className="flex items-center gap-2">
                  <Image src={CheckIcons} alt="Checked icons" />
                  50-100 o'quvchi
                </li>
                <li className="flex items-center gap-2">
                  <Image src={CheckIcons} alt="Checked icons" />
                  Shop bo'limi
                </li>
                <li className="flex items-center gap-2">
                  <Image src={CheckIcons} alt="Checked icons" />
                  O'quvchi Profili
                </li>
              </ul>
            </article>
          </div>

          <div className="bg-white rounded-xl p-5 border border-transparent transition duration-300 shadow-xl group hover:drop-shadow-orange hover:-translate-y-[10px]">
            <article className="flex-grow">
              <h6 className="text-[25px] font-bold text-black mb-3">O'rta</h6>
              <p className="text-[35px] font-bold text-black mb-4">
                699.000 /{" "}
                <span className="text-[16px] font-semibold text-black">
                  oylik
                </span>
              </p>
              <button className="w-full px-5 py-3 bg-transparent border-[2px] group-hover:bg-black transition duration-300 group-hover:text-white rounded-[10px] cursor-pointer mb-6">
                To'lov qilish
              </button>
              <p className="text-[16p] font-semibold text-black mb-4">
                Ta'rif haqida
              </p>
              <ul className="flex flex-col gap-2 mb-12 text-black">
                <li className="flex items-center gap-2">
                  <Image src={CheckIcons} alt="Checked icons" />
                  50-100 o'quvchi
                </li>
                <li className="flex items-center gap-2">
                  <Image src={CheckIcons} alt="Checked icons" />
                  Shop bo'limi
                </li>
                <li className="flex items-center gap-2">
                  <Image src={CheckIcons} alt="Checked icons" />
                  O'quvchi Profili
                </li>
              </ul>
            </article>
          </div>

          <div className="bg-white rounded-xl p-5 border border-transparent transition duration-300 shadow-xl group hover:drop-shadow-orange hover:-translate-y-[10px]">
            <article className="flex-grow">
              <h6 className="text-[25px] font-bold text-black mb-3">Premium</h6>
              <p className="text-[35px] font-bold text-black mb-4">
                899.000 /{" "}
                <span className="text-[16px] font-semibold text-black">
                  oylik
                </span>
              </p>
              <button className="w-full px-5 py-3 bg-transparent border-[2px] group-hover:bg-black transition duration-300 group-hover:text-white rounded-[10px] cursor-pointer mb-6">
                To'lov qilish
              </button>
              <p className="text-[16p] font-semibold text-black mb-4">
                Ta'rif haqida
              </p>
              <ul className="flex flex-col gap-2 mb-12 text-black">
                <li className="flex items-center gap-2">
                  <Image src={CheckIcons} alt="Checked icons" />
                  50-100 o'quvchi
                </li>
                <li className="flex items-center gap-2">
                  <Image src={CheckIcons} alt="Checked icons" />
                  Shop bo'limi
                </li>
                <li className="flex items-center gap-2">
                  <Image src={CheckIcons} alt="Checked icons" />
                  O'quvchi Profili
                </li>
              </ul>
            </article>
          </div>

          {/* <div className="bg-gray-50 rounded-xl p-5">
          <h6 className="text-[25px] font-bold text-[#D8FEE5] mb-3">O'rta</h6>
          <p className="text-[35px] font-bold text-[#D8FEE5] mb-4">
            699.000 /{" "}
            <span className="text-[16px] font-semibold text-white">oylik</span>
          </p>
          <p className="text-[16p] font-semibold text-white mb-4">
            Ta'rif haqida
          </p>
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
          <button className="w-full px-5 py-3 bg-white rounded-[10px] cursor-pointer">
            To'lov qilish
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-5">
          <h6 className="text-[25px] font-bold text-[#D8FEE5] mb-3">Premium</h6>
          <p className="text-[35px] font-bold text-[#D8FEE5] mb-4">
            899.000 /{" "}
            <span className="text-[16px] font-semibold text-white">oylik</span>
          </p>
          <p className="text-[16p] font-semibold text-white mb-4">
            Ta'rif haqida
          </p>
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
          <button className="w-full px-5 py-3 bg-white rounded-[10px] cursor-pointer">
            To'lov qilish
          </button>
        </div> */}
        </div>
      </div>
    </div>
  );
}

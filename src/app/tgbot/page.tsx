import Image from "next/image";
import { BsCoin } from "react-icons/bs";
import { BiHome } from "react-icons/bi";
import { GiTrophyCup } from "react-icons/gi";
import { GoPerson } from "react-icons/go";
import { SiLevelsdotfyi } from "react-icons/si";
import "./tgbot.css";

const profile = {
  user: "Shamsiddin",
};

export default function TgBot() {
  return (
    <section className="w-full max-w-[450px] m-auto overflow-hidden flex flex-col justify-between min-h-screen fixed bottom-0 left-0 right-0 pt-[15px] pb-0 px-[15px]">
      <div className="min-h-screen bg-orange-500/85 rounded-xl flex flex-col border">
        <div className="w-full max-w-[450px] m-auto px-4 pb-10 rounded-lg rounded-t-xl">
          <h1 className="pt-16 pb-7 text-white font-semibold text-xl">
            Hello, {profile.user}
          </h1>

          <div className="grid grid-cols-3 justify-between bg-white rounded-lg py-2 mb-11">
            <div className="flex flex-col justify-center items-center border-r border-orange-500 last:border-r-0">
              <article className="flex items-center gap-2">
                <BsCoin className="fill-[#f9d222] text-[24px]" />
                <span className="font-extralight text-sm">Ball</span>
              </article>
              <p className="font-normal text-base ml-10">788</p>
            </div>
            <div className="flex flex-col justify-center items-center border-r border-orange-500 last:border-r-0">
              <article className="flex items-center gap-2">
                <GiTrophyCup className="fill-[#f9d222] text-[24px]" />
                <span className="font-extralight text-sm">Reyting </span>
              </article>
              <p className="font-normal text-base ml-10">1</p>
            </div>
            <div className="flex flex-col justify-center items-center border-r border-orange-500 last:border-r-0">
              <article className="flex items-center gap-2">
                <SiLevelsdotfyi className="fill-[#f9d222] text-[24px] rotate-90" />
                <span className="font-extralight text-sm">Daraja </span>
              </article>
              <p className="font-normal text-base ml-10">5</p>
            </div>
          </div>
        </div>

        <article className="bg-white pt-16 mt-auto">
          <div className="w-full max-w-[420px] m-auto px-4">
            <div className="bg-orange-500/85 bg-no-repeat bg-center bg-contain p-6 flex justify-between items-center rounded-lg mb-10">
              <div className="text-black text-sm">
                <p>Bozorga borib xarid qildim</p>
                <p>Kattaligi bois adashdim</p>
                <p>Agar dono bo'lishni istasang</p>
                <p>Albatta, tinmay o'rganishing kerak</p>
              </div>
              <div className="relative w-24 h-32">
                <Image
                  src="/img/twoPerson.png"
                  alt="ImagePerson"
                  width={96}
                  height={128}
                  className="object-contain absolute left-[24px] top-[17.5px]"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-evenly items-center text-center border-t bg-[#FFFFFF] py-2">
            <div className="flex flex-col items-center cursor-pointer group">
              <BiHome className="text-3xl group-hover:fill-orange-500/85 transition-all duration-150" />
              <h1 className="group-hover:text-orange-500/85 font-medium text-large transition-all duration-150">
                Uy
              </h1>
            </div>
            <div className="flex flex-col items-center cursor-pointer group">
              <GiTrophyCup className="text-3xl group-hover:fill-orange-500/85 transition-all duration-150" />
              <h1 className="group-hover:text-orange-500/85 font-medium text-large transition-all duration-150">
                Yetakchilar
              </h1>
            </div>
            <div className="flex flex-col items-center cursor-pointer group">
              <GoPerson className="text-3xl group-hover:fill-orange-500/85 transition-all duration-150" />
              <h1 className="group-hover:text-orange-500/85 font-medium text-large transition-all duration-150">
                Profile
              </h1>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

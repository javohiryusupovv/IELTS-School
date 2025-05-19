import Image from "next/image";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import { BsCoin } from "react-icons/bs";
import Navbar from "./Navbar";
import { ICreateShop } from "@/types/type";
import { getEducationData } from "@/actions/crmaccount.action";

export default async function ShopList() {
  const educationData = await getEducationData();
  const productss = educationData.shops
  

  return (
    <div className="container w-full">
      <Navbar />
      <div className="mb-10">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-[20px] mb-6"
        >
          <IoArrowBack className="text-[25px]" />
          Orqaga
        </Link>
        <div>
          <div className="grid grid-cols-3 gap-5 max-xl:grid-cols-2 max-md:grid-cols-1 max-sm:px-2">
            {productss?.map((product: ICreateShop, id: number) => (
              <div className="border rounded-lg" key={id}>
                <article className="h-[250px] w-full overflow-hidden flex justify-center mb-8">
                  <Image
                    className="object-cover w-full h-full"
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={250}
                  />
                </article>
                <div className="px-3 pb-3">
                  <article className="flex items-center justify-between mb-3">
                    <h6 className="text-[20px] font-medium">{product.title}</h6>
                    <p className="flex items-center gap-1 py-1 px-2 rounded-[5px] border">
                      <BsCoin className="fill-[#f9d222] text-[20px]" />
                      <span className="font-normal text-[14px]">
                        {product.price}
                      </span>
                    </p>
                  </article>
                  <Link href={`/shop/${product._id}`}>
                    <button className="px-2 py-2 border rounded-md cursor-pointer">
                      Almashtirish
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

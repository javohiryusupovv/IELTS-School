import Image from "next/image";
import Link from "next/link";
import { BsCoin } from "react-icons/bs";
import { Fragment } from "react";
import { FiBox } from "react-icons/fi";
import { IShops } from "../../../../app.types";
import { getEducationData } from "@/actions/education.action";

export const dynamic = "force-dynamic";

export default async function ShopList() {
  const getEducationShop = await getEducationData();
  const products = getEducationShop?.shops;
  
  return (
    <div className="container w-full pt-[75px]">
      <article className="w-full text-center py-2 mb-8">
        <p className="text-[20px] font-medium text-orange-500">Shop Bo'limi</p>
      </article>
      <div>
        <div className="grid grid-cols-2 gap-2 pb-20 px-3">
          {products?.length < 1 ? (
            <div className="w-full h-full">
              <article className="flex flex-col items-center gap-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <FiBox className="w-[30px] h-[30px] stroke-1 drop-shadow-xl stroke-orange-500 animate-bounce" />
                <p className="text-[15px] font-medium text-orange-500">
                  Mahsulotlar Qolmadi !
                </p>
              </article>
            </div>
          ) : (
            products?.map((product: IShops, id: number) => (
              <Fragment key={id}>
                {product.remainingQuantity <= 0 ? (
                  <div className="border w-full flex flex-col justify-between rounded-lg bg-white overflow-hidden">
                    <article className="w-full h-[170px] overflow-hidden flex justify-center mb-5 relative">
                      <Image
                        className="w-full h-full object-cover filter blur-[2px] brightness-65"
                        src={product.image}
                        alt={product.title}
                        width={200}
                        height={200}
                      />
                    </article>
                    <div className="px-2 pb-3">
                      <article className="mb-3">
                        <h6 className="text-[14px] font-medium mb-3 line-clamp-2">
                          {product.title}
                        </h6>
                        <span className="inline-flex items-center py-1 px-2 border rounded-md justify-items-start gap-2 mb-5">
                          <BsCoin className="fill-[#f9d222] text-[17px]" />
                          <span className="font-normal text-[12px]">
                            {product.price}
                          </span>
                        </span>
                        <p className="text-red-500 text-[12px]">Mahsulot qolmadi !</p>
                      </article>
                      <button
                        disabled
                        className="w-full px-8 py-2 rounded-sm cursor-not-allowed bg-gray-300 text-white text-[14px]"
                      >
                        Mahsulot tugagan
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border w-full flex flex-col justify-between rounded-lg bg-white overflow-hidden">
                    <article className="w-full h-[170px] overflow-hidden flex justify-center mb-5">
                      <Image
                        className="w-full h-full object-cover"
                        src={product.image}
                        alt={product.title}
                        width={200}
                        height={200}
                      />
                    </article>
                    <div className="px-2 pb-3">
                      <article className="mb-3">
                        <h6 className="text-[14px] font-medium mb-3 line-clamp-2">
                          {product.title}
                        </h6>
                        <span className="inline-flex items-center py-1 px-2 border rounded-md justify-items-start gap-2 mb-5">
                          <BsCoin className="fill-[#f9d222] text-[17px]" />
                          <span className="font-normal text-[12px]">
                            {product.price}
                          </span>
                        </span>
                        <p className="text-[12px] flex items-center gap-2 text-green-500">
                          <span className="font-medium text-black">
                            Mahsulot qoldi:
                          </span>
                          {product.remainingQuantity} dona
                        </p>
                      </article>
                      <Link href={`/student/shop/${product._id}`}>
                        <button className="w-full px-8 py-2 rounded-sm cursor-pointer bg-orange-500 hover:bg-orange-500/70 transition-all duration-300 text-white text-[14px]">
                          Olish
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </Fragment>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

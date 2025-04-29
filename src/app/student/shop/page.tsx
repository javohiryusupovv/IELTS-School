import Image from "next/image";
import Link from "next/link";
import { BsCoin } from "react-icons/bs";
import { updateShop } from "@/actions/shop.action";
import { Fragment } from "react";
import { FiBox } from "react-icons/fi";
import { IShops } from "../../../../app.types";


export const dynamic = "force-dynamic"

export default async function ShopList() {
  let products: IShops[] = []

  try {
    const rawProducts = await updateShop()
    products = JSON.parse(JSON.stringify(rawProducts))
  } catch (error) {
    console.error("Failed to fetch products:", error)
  }

  return (
    <div className="container w-full min-h-screen pt-5">
      <article className="w-full text-center py-2 mb-8">
        <p className="text-[20px] font-medium text-orange-500">Shop Bo'limi</p>
      </article>
      <div>
        <div className="grid grid-cols-2 gap-2 pb-20 px-3">
          {
            products.length < 1 ? (
              <div className="w-full h-full">
                <article className="flex flex-col items-center gap-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  <FiBox className="w-[30px] h-[30px] stroke-1 drop-shadow-xl stroke-orange-500 animate-bounce" />
                  <p className="text-[15px] font-medium text-orange-500">Mahsulotlar Qolmadi !</p>
                </article>
              </div>
            ) : (
              products?.map((product: IShops, id: number) => (
                <Fragment key={id}>
                  {product.activeProduct ? (
                    <div className="border w-full flex flex-col justify-between rounded-lg bg-white overflow-hidden" >
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
                        <article className="mb-5">
                          <h6 className="text-[14px] font-medium mb-3 line-clamp-2">{product.title}</h6>
                          <span className="inline-flex items-center py-1 px-2 border rounded-md justify-items-start gap-2">
                            <BsCoin className="fill-[#f9d222] text-[17px]" />
                            <span className="font-normal text-[12px]">{product.price}</span>
                          </span>
                        </article>
                        <Link href={`/student/shop/${product._id}`}>
                          <button className="w-full px-8 py-2 rounded-sm cursor-pointer bg-orange-500 hover:bg-orange-500/70 transition-all duration-300 text-white text-[14px]">
                            Olish
                          </button>
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </Fragment>
              )
              ))}
        </div>
      </div>
    </div>
  );
}

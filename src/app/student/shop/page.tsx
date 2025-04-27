import Image from "next/image";
import Link from "next/link";
import { BsCoin } from "react-icons/bs";
import { getShop } from "@/actions/shop.action";
import { ICreateShop } from "@/types/type";
import { Fragment } from "react";
import { FiBox } from "react-icons/fi";

export default async function ShopList() {
  const productss = await getShop();
  const activeProducts = productss.filter((product) => product.activeProduct === true);
  console.log(activeProducts);
  

  return (
    <div className="container w-full min-h-screen pt-5">
      <article className="w-full text-center py-2 mb-8">
        <p className="text-[20px] font-medium text-orange-500">Shop Bo'limi</p>
      </article>
      <div>
        <div className="grid grid-cols-1 gap-10 pb-20">
          {
            activeProducts.length < 1 ? (
              <div className="w-full h-full">
                <article className="flex flex-col items-center gap-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  <FiBox className="w-[30px] h-[30px] stroke-1 drop-shadow-xl stroke-orange-500 animate-bounce" />
                  <p className="text-[15px] font-medium text-orange-500">Mahsulotlar Qolmadi !</p>
                </article>
              </div>
            ) :
              activeProducts?.map((product, id: number) => (
                <Fragment key={id}>
                  {product.activeProduct ? (
                    <div className="border w-[80%] pt-10 m-auto rounded-lg bg-white overflow-hidden" >
                      <article className="w-full overflow-hidden flex justify-center mb-8">
                        <Image
                          className="w-[250px] object-cover"
                          src={product.image}
                          alt={product.title}
                          width={200}
                          height={200}
                        />
                      </article>
                      <div className="px-5 pb-3">
                        <article className="mb-5">
                          <h6 className="text-[20px] font-medium mb-3">{product.title}</h6>
                          <span className="inline-flex items-center py-2 px-4 border rounded-md justify-items-start gap-2">
                            <BsCoin className="fill-[#f9d222] text-[20px]" />
                            <span className="font-normal text-[16px]">{product.price}</span>
                          </span>
                        </article>
                        <Link href={`/student/shop/${product._id}`}>
                          <button className="w-full px-10 py-2 border rounded-sm cursor-pointer bg-orange-500 hover:bg-orange-500/70 transition-all duration-300 text-white">
                            Olish
                          </button>
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </Fragment>
              )
              )}
        </div>
      </div>
    </div>
  );
}

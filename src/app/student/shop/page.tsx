import Image from "next/image";
import Link from "next/link";
import { BsCoin } from "react-icons/bs";
import { getShop } from "@/actions/shop.action";
import { ICreateShop } from "@/types/type";

export default async function ShopList() {
  const productsJSON = await getShop();
  const productss = JSON.parse(JSON.stringify(productsJSON));
  


  return (
    <div className="container w-full pt-5">
      <article className="w-full text-center py-2 mb-8">
        <p className="text-[20px] font-medium text-orange-500">Shop Bo'limi</p>
      </article>
      <div>
        <div className="grid grid-cols-1 gap-10 pb-20">
          {productss?.map((product: ICreateShop, id: number) => (
            <div className="border w-[80%] m-auto rounded-lg bg-white overflow-hidden" key={id}>
              <article className="h-[250px]  overflow-hidden flex justify-center mb-8">
                <Image
                  className="object-cover w-full h-full"
                  src={product.image}
                  alt={product.title}
                  width={200}
                  height={200}
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
                <Link href={`/student/shop/${product._id}`}>
                  <button className="px-10 py-2 border rounded-sm cursor-pointer hover:bg-orange-500 transition-all duration-300 hover:text-white">
                    Olish
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

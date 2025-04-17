import Image from "next/image";
import Navbar from "../Navbar";
import { BsCoin } from "react-icons/bs";
import ClientProps from "./_actions/ClientProps";
import { getShopId } from "@/actions/shop.action";

export default async function ShopId({params,}:{params: Promise<{ id: string }>}){
  const id = (await params).id;
  const products = await getShopId(id);
  const product = JSON.parse(JSON.stringify(products));
  

  if (!products) {
    return <p>Mahsulot topilmadi</p>;
  }

  return (
    <div className="container">
      <Navbar />
      <div className="grid grid-cols-2 gap-x-3 justify-between max-lg:grid-cols-1 max-md:px-2 max-lg:gap-x-2">
        <div className="max-lg:flex max-lg:flex-col">
          <h6 className="text-2xl font-medium mb-5">{products.title}</h6>
          <Image
            src={products.image}
            alt={products.title}
            width={600}
            height={500}
            priority
            className="max-lg:self-center"
          />
        </div>
        <div className="w-full flex flex-col items-start gap-2 mt-12 max-md:mt-6">
          <article>
            <h6 className="text-[20px] mb-4">Tavsifi:</h6>
            <p className="text-[15px] text-gray-600 mb-4 max-sm:mb-1">
              {product.description}
            </p>
            <article className=" max-xl:flex max-xl:items-center max-xl:justify-between">
              <button className="flex items-center gap-2 px-2 py-1 border rounded-full bg-[#f9d922]">
                <BsCoin className="fill-white text-[20px]" />
                <p className="text-white">{product.price}</p>
              </button>
              <ClientProps product={product} />
            </article>
          </article>
        </div>
      </div>
    </div>
  );
}

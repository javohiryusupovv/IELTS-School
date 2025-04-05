import Image from "next/image";
import Navbar from "../Navbar";
import { BsCoin } from "react-icons/bs";
import { getProducts } from "../../../../constants/page";
import ClientProps from "./_actions/ClientProps";

export default async function ShopId({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const products = await getProducts();
  const product = products.find((p) => String(p.id) === id);

  console.log(product);
  

  if (!product) {
    return <p>Mahsulot topilmadi</p>;
  }

  return (
    <div className="container">
      <Navbar />
      <div className="grid grid-cols-2 justify-between">
        <div>
          <h6 className="text-2xl font-medium mb-5">{product.title}</h6>
          <Image
            src={product.image}
            alt={product.title}
            width={600}
            height={500}
            priority
          />
        </div>
        <div className="w-full flex flex-col items-start gap-2 mt-12">
          <article>
            <h6 className="text-[20px] mb-4">Tavsifi:</h6>
            <p className="text-[15px] text-gray-600 mb-4">{product.description}</p>
            <button className="flex items-center gap-2 px-2 py-1 border rounded-full bg-[#f9d922]">
              <BsCoin className="fill-white text-[20px]"/>
              <p className="text-white">{product.coin}</p>
            </button>
          </article>
          <ClientProps product={product} />
        </div>
      </div>
    </div>
  );
}

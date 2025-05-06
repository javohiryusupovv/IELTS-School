import Image from "next/image";
import { BsCoin } from "react-icons/bs";
import ClientProps from "./_actions/ClientProps";
import { getShopId } from "@/actions/shop.action";
import { getStudentFromCookie } from "@/actions/student.check";

export default async function ShopId({params,}:{params: Promise<{ id: string }>}){
  const id = (await params).id;
  const products = await getShopId(id);
  const product = JSON.parse(JSON.stringify(products));
  const student = await getStudentFromCookie();

  const coins = student?.coins?.reduce((sum: number, coin: any) => sum + coin.value, 0) ?? 0;

  

  if (!products) {
    return <p>Mahsulot topilmadi</p>;
  }

  return (
    <div className="container pb-20 pt-[90px] overflow-y-scroll scrolbars">
      <div className="grid w-[80%] m-auto">
        <div className="max-lg:flex max-lg:flex-col">
          <h6 className="text-2xl font-medium mb-5">{products.title}</h6>
          <article className="w-full overflow-hidden flex justify-center">
            <Image
              src={products.image}
              alt={products.title}
              width={400}
              height={300}
              priority
              className="max-lg:self-center rounded-md mb-4 w-full object-cover"
            />
          </article>
        </div>
        <div className="w-full flex flex-col items-start gap-2">
          <article className="w-full">
            <h6 className="text-[20px] mb-1">Tavsifi:</h6>
            <p className="text-[14px] text-gray-600 mb-4 max-sm:mb-1">
              {product.description}
            </p>
            <article className="w-full">
              <button className="flex items-center gap-2 px-2 py-1 border rounded-full bg-yellow-400 mb-8">
                <BsCoin className="fill-white text-[20px]" />
                <p className="text-white">{product.price}</p>
              </button>
              <ClientProps product={product} coins={coins} student={student}/>
            </article>
          </article>
        </div>
      </div>
    </div>
  );
}

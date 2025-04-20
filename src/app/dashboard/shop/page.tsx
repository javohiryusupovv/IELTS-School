import Image from "next/image"
import SwitchSettings from "./_components/actions"
import { getShop } from "@/actions/shop.action"
import { ICreateShop } from "@/types/type";

async function ShopAdmin() {
  const productsJSON = await getShop();
  const product = JSON.parse(JSON.stringify(productsJSON));

  return (
    <div>
      <p className="mb-10 text-[18px] font-medium">Shop List</p>
      <div className="grid grid-cols-3 xl:grid-cols-4 gap-4 justify-center w-full ">
        {product.map((item: ICreateShop) => (
          <div key={item._id} className="relative top-0 left-0 px-2 py-5 w-full flex flex-col justify-center items-center border rounded-md">
            <article className="w-[200px] overflow-hidden my-10">
              <Image width={300} height={250} className="w-full h-full object-cover" src={item.image} alt="Iphone Teleofon" />
            </article>
            <SwitchSettings products={item} /> 
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShopAdmin

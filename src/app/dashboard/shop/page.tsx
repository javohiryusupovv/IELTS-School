import Image from "next/image"
import SwitchSettings from "./_components/actions"
import { getShop } from "@/actions/shop.action"
import DeleteProduct from "./_components/deletefn";
import { IShops } from "../../../../app.types";

async function ShopAdmin() {
  const productJSON = await getShop();
  const product = await JSON.parse(JSON.stringify(productJSON));

  return (
    <div>
      <p className="mb-10 text-[18px] font-medium">Shop List</p>
      <div className="grid grid-cols-3 xl:grid-cols-4 gap-4 justify-center w-full ">
        {product.map((item: IShops) => (
          <div key={item._id} className="relative top-0 left-0 px-2 py-5 w-full flex flex-col justify-center items-center border rounded-md">
            <article className="w-full h-[180px] overflow-hidden my-10">
              <Image width={200} height={200} className="w-full h-full object-contain overflow-hidden" src={item.image} alt="Iphone Teleofon" />
            </article>
            <SwitchSettings status={item.activeProduct} productID={item._id} />
            <DeleteProduct products={item} />
            <p className="line-clamp-2">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShopAdmin

import Image from "next/image";
import SwitchSettings from "./_components/actions";
import DeleteProduct from "./_components/deletefn";
import { IShops } from "../../../../app.types";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getEducationData } from "@/actions/crmaccount.action";

async function ShopAdmin() {
  const educationData = await getEducationData();
  const product = educationData.shops

  return (
    <div>
      <article className="flex justify-between items-center mb-10">
        <p className="text-[18px] font-medium">Shop List</p>
        <Link
          href={"/dashboard/shop/addproducts"}
          className="sm:hidden py-[6px] px-2 rounded-md bg-[#f18024] hover:bg-[#f18024ca] transition-all duration-200"
        >
          <Plus className="text-white h-5 w-5" />
        </Link>
      </article>
      <div className="grid max-shopgrid:grid-cols-1 lg:grid-cols-3 grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-4 justify-center w-full ">
        {product.map((item: IShops) => (
          <div
            key={item._id}
            className="relative top-0 left-0 px-2 py-5 w-full flex flex-col justify-center items-center border rounded-md"
          >
            <article className="w-full h-[180px] overflow-hidden my-10">
              <Image
                width={200}
                height={200}
                className="w-full h-full object-contain overflow-hidden"
                src={item.image}
                alt="Iphone Teleofon"
              />
            </article>
            <SwitchSettings status={item.activeProduct} productID={item._id} />
            <DeleteProduct products={item} />
            <p className="line-clamp-2">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopAdmin;

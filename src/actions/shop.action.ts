"use server"

import ConnectMonogDB from "@/lib/mongodb";
import { ICreateShop } from "@/types/type";
import { revalidatePath } from "next/cache";
import Education from "@/models/courseBox.model";
import {Course, Student, Teacher, Shop} from "@/models/index"


export const postShop = async ( data: ICreateShop, path: string) => {

    if (!data.price || !data.image || !data.educationID) {
        throw new Error("Data not found")
    }
    try {
        await ConnectMonogDB()
        const newShop = await Shop.create(data);
      
          // 2. EducationCenter hujjatiga push qilish
          await Education.findByIdAndUpdate(data.educationID, {
            $push: { shops: newShop._id },
          });
        revalidatePath(path)
    } catch (error) {
        throw new Error(`Xatolik yuz berid POST Shopda, ${error}`)
    }
}



interface IProductUpdateData {
  title: string;
  description: string;
  price: number;
  quantity: number;
}

export const newEditShopProduct = async (
  productId: string,
  data: IProductUpdateData,
  path: string
) => {
  if (!productId || !data) {
    throw new Error("Noto‘g‘ri ma‘lumot kiritildi");
  }

  try {
    await ConnectMonogDB();
    const product = await Shop.findById(productId);

    if (!product) {
      throw new Error("Mahsulot topilmadi");
    }

    // Asosiy ma'lumotlarni yangilash
    product.title = data.title || product.title;
    product.description = data.description || product.description;
    product.price = data.price || product.price;

    // Miqdorni yangilash
    if (data.quantity && data.quantity > 0) {
      product.remainingQuantity += data.quantity;
      product.totalQuantity += data.quantity;
    }

    await product.save();
    revalidatePath(path);

    return { success: true };
  } catch (error: any) {
    throw new Error(
      `Xatolik yuz berdi SHOP yangilashda: ${error.message || error}`
    );
  }
};




export const getShopId = async (id: string) => {
    try {
        await ConnectMonogDB()
        return await Shop.findById(id)
    } catch (error) {
        throw new Error(`Xatolik yuz berid GET ShopIdda, ${error}`)
    }
}

export const deleteShop = async (id: string, path: string) => {
    try {
        await ConnectMonogDB()
        await Shop.findByIdAndDelete(id)
        revalidatePath(path)
    } catch (error) {
        throw new Error(`Xatolik yuz berid DELETE Shopda, ${error}`)
    }
}

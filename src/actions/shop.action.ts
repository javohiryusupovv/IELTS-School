"use server"

import ConnectMonogDB from "@/lib/mongodb";
import { ICreateShop } from "@/types/type";
import { revalidatePath, revalidateTag } from "next/cache";
import { IShops } from "../../app.types";
import Education from "@/models/courseBox.model";
import {Course, Student, Teacher, Shop} from "@/models/index"


export const postShop = async ( data: ICreateShop, path: string) => {

    if (!data.title || !data.description || !data.price || !data.image || !data.educationID) {
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



export const ShopActive = async (id: string, status: boolean, path: string) => {
    try {
        await ConnectMonogDB()
        await Shop.findByIdAndUpdate(id, { activeProduct: status }, { new: true } );
        revalidatePath(path)
        return { success: true, status };
    } catch (error) {
        throw new Error(`Xatolik yuz berid Shopda, ${error}`)
    }
}

export const updateShop = async () => {
    await ConnectMonogDB()
    const products = await Shop.find({ activeProduct: true }).lean()
    return products
}



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

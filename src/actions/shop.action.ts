"use server"

import ConnectMonogDB from "@/lib/mongodb";
import Shop from "@/models/shop.model";
import { ICreateShop } from "@/types/type";
import { revalidatePath } from "next/cache";
import { IShops } from "../../app.types";


export const getShop = async () => {
    try {
        await ConnectMonogDB()
        const shops = await Shop.find()
        return shops as IShops[]
    } catch (error) {
        throw new Error(`Xatolik yuz berid GET Shopda`)
    }
}

 

export const postShop = async (data: ICreateShop, path: string) => {
    if (!data.title || !data.description || !data.price || !data.image) {
        throw new Error("Data not found")
    }
    try {
        await ConnectMonogDB()
        await Shop.create(data)
        revalidatePath(path)
    } catch (error) {
        throw new Error(`Xatolik yuz berid POST Shopda, ${error}`)
    }
}



export const ShopActive = async (id: string, status: boolean) => {
    try {
        await ConnectMonogDB()
        await Shop.findByIdAndUpdate(id, { activeProduct: status }, { new: true } );
    } catch (error) {
        throw new Error(`Xatolik yuz berid Shopda, ${error}`)
    }
}

export const updateShop = async () => {
    await ConnectMonogDB()
    const shops = await Shop.find({ activeProduct: true })
    return shops as IShops[]
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

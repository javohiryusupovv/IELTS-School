"use server"

import ConnectMonogDB from "@/lib/mongodb";
import Shop from "@/models/shop.model";
import { ICreateShop } from "@/types/type";
import { revalidatePath } from "next/cache";


export const postShop = async(data: ICreateShop, path:string) => {
    if(!data.title || !data.description || !data.price || !data.image) {
        throw new Error("Data not found")
    }

    try{
        await ConnectMonogDB()
        await Shop.create(data)
        revalidatePath(path)
        return true
    }catch(error){
        throw new Error(`Xatolik yuz berid POST Shopda, ${error}`)
    }
}

export const getShop = async() => {
    try{
        await ConnectMonogDB()
        const shop = await Shop.find()
        return shop
    }catch(error){
        throw new Error(`Xatolik yuz berid GET Shopda, ${error}`)
    }
}

export const getShopId = async(id: string) => {
    try{
        await ConnectMonogDB()
        const shop = await Shop.findById(id)
        return shop
    }catch(error){
        throw new Error(`Xatolik yuz berid GET ShopIdda, ${error}`)
    }
}

"use server"

import ConnectMonogDB from "@/lib/mongodb";
import { ICRMAccount } from "../../app.types";
import CrmAccount from "@/models/crmadmin.model";
import { revalidatePath, revalidateTag } from "next/cache";


export const createAccount = async (data: ICRMAccount, path: string) => {
    try{
        await ConnectMonogDB();
        const account = await CrmAccount.create(data);
        revalidatePath(path);
        revalidateTag("crmaccounts")
        return JSON.parse(JSON.stringify(account));
    }catch (error: any) {
        if(error.code === 11000){
            throw new Error("Login allaqachon mavjud!");
        }
        throw new Error("Error creating account");
    }
}


export const getAccounts = async () => {
    try{
        await ConnectMonogDB();
        const accounts = await CrmAccount.find();
        return JSON.parse(JSON.stringify(accounts));
    }catch (error) {
        throw new Error("Error fetching accounts");
    }
}

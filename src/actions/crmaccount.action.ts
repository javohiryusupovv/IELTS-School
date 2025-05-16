"use server"

import ConnectMonogDB from "@/lib/mongodb";
import { ICRMAccount, IPaymentAdd } from "../../app.types";
import CrmAccount from "@/models/crmadmin.model";
import { revalidatePath, revalidateTag } from "next/cache";
import PaymentAdd from "@/models/payment.model";


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



export const paymentDaysAdd = async(payment: IPaymentAdd, path: string) => {
    try{
        await ConnectMonogDB();
        const paySucces = await PaymentAdd.create(payment)
        revalidatePath(path)
        return JSON.parse(JSON.stringify(paySucces));
    }catch(error){
        throw new Error("To'lov qushishda xatolik")
    }
}

export const getPayments = async () => {
    try {
      await ConnectMonogDB();
      const payments = await PaymentAdd.find(); // eng oxirgi to'lovlar birinchi chiqadi
      return JSON.parse(JSON.stringify(payments));
    } catch (error) {
      throw new Error("To'lovlarni olishda xatolik");
    }
  };



export const getAccounts = async () => {
    try{
        await ConnectMonogDB();
        const accounts = await CrmAccount.find();
        return JSON.parse(JSON.stringify(accounts));
    }catch (error) {
        throw new Error("Error fetching accounts");
    }
}

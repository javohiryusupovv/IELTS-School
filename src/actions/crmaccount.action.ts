"use server";

import ConnectMonogDB from "@/lib/mongodb";
import { ICRMAccount, IEducationCenter, IPaymentAdd } from "../../app.types";
import CrmAccount from "@/models/crmadmin.model";
import { revalidatePath, revalidateTag } from "next/cache";
import PaymentAdd from "@/models/payment.model";
import Education from "@/models/courseBox.model";

export const educationCreate = async (
  education: IEducationCenter,
  path: string
) => {
  try {
    await ConnectMonogDB();
    const educationCreat = await Education.create(education);
    revalidatePath(path);
    return JSON.parse(JSON.stringify(educationCreat));
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error("Login allaqachon mavjud!");
    }
    throw new Error("Error creating account");
  }
};

export const getEducationData = async () => {
  try {
    await ConnectMonogDB();
    const educationData = await Education.findOne().populate([
      {
        path: "teachers",
        select: "teacherName teacherSurname teacherPhone",
        options: { strictPopulate: false },
      },
      {
        path: "students",
        select: "name surname phone",
        options: { strictPopulate: false },
      },
      {
        path: "courses",
        select: "courseName price",
        options: { strictPopulate: false },
      },
      {
        path: "shops",
        select: "title description price image activeProduct educationCenterId",
        options: { strictPopulate: false },
      },
    ]);
    return JSON.parse(JSON.stringify(educationData));
  } catch (error) {
    throw new Error(
      "Education center ma'lumotlarini olishda xatolik: " + error
    );
  }
};

export const createAccount = async (data: ICRMAccount, path: string) => {
  try {
    await ConnectMonogDB();
    const account = await CrmAccount.create(data);
    revalidatePath(path);
    revalidateTag("crmaccounts");
    return JSON.parse(JSON.stringify(account));
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error("Login allaqachon mavjud!");
    }
    throw new Error("Error creating account");
  }
};

export const paymentDaysAdd = async (payment: IPaymentAdd, path: string) => {
  try {
    await ConnectMonogDB();
    const paySucces = await PaymentAdd.create(payment);
    revalidatePath(path);
    return JSON.parse(JSON.stringify(paySucces));
  } catch (error) {
    throw new Error("To'lov qushishda xatolik");
  }
};

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
  try {
    await ConnectMonogDB();
    const accounts = await CrmAccount.find();
    return JSON.parse(JSON.stringify(accounts));
  } catch (error) {
    throw new Error("Error fetching accounts");
  }
};

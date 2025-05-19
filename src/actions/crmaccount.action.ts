"use server";

import ConnectMonogDB from "@/lib/mongodb";
import { ICRMAccount, IEducationCenter, IPaymentAdd } from "../../app.types";
import CrmAccount from "@/models/crmadmin.model";
import { revalidatePath, revalidateTag } from "next/cache";
import PaymentAdd from "@/models/payment.model";
import Education from "@/models/courseBox.model";
import { cookies } from "next/headers";

import { Course, Student, Teacher, Shop } from "@/models/index";

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
    const cookieStore = await cookies();
    const cookie = cookieStore.get("admin-auth");
    if (!cookie?.value) return null;

    const { _id } = JSON.parse(cookie.value); // adminning educationCenter _id si
    await ConnectMonogDB();

    const educationData = await Education.findById(_id).populate([
      {
        path: "teachers",
        select: "teacherName teacherSurname teacherPhone",
        options: { strictPopulate: false },
      },
      {
        path: "students",
        select: "name surname phone studentID publishStudent course coins",
        populate: {
          path: "course",
          model: Course,
          select: "_id courseTitle",
        },
        options: { strictPopulate: false },
      },
      {
        path: "courses",
        select: "courseTitle",
        options: { strictPopulate: false },
      },
      {
        path: "shops",
        select: "title description price image activeProduct educationID",
        options: { strictPopulate: false },
      },
    ]);

    return JSON.parse(JSON.stringify(educationData)); // frontga mos format
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

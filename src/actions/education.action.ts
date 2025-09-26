"use server";

import ConnectMonogDB from "@/lib/mongodb";
import { IAdministrator, IEducationCenter, IPaymentAdd } from "../../app.types";
import CrmAccount from "@/models/administrator.model";
import { revalidatePath, revalidateTag } from "next/cache";
import PaymentAdd from "@/models/payment.model";
import Education from "@/models/courseBox.model";
import { Course, Student, Teacher, Shop } from "@/models/index";
import AdministratorModel from "@/models/administrator.model";
import { formatDateFromDMY } from "../../constants/page";

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
    const educationData = await Education.findOne({}).populate([
      {
        path: "teachers",
        select: "teacherName teacherSurname teacherPhone",
        options: { strictPopulate: false },
      },
      {
        path: "students",
        select: "name surname phone studentID publishStudent course coins payments balance attendance",
        populate: {
          path: "course",
          model: Course,
          select: "_id courseTitle price",
          populate: {
            path: "teacher",
            model: Teacher, // Teacher model nomini yozing
            select: "_id teacherName teacherSurname teacherPhone",
          },
        },
        options: { strictPopulate: false },
      },
      {
        path: "courses",
        select: "courseTitle price",
        populate: {
          path: "teacher",
          select: "teacherName teacherSurname teacherPhone", // faqat kerakli maydonlar
          options: { strictPopulate: false },
        },
        options: { strictPopulate: false },
      },
      {
        path: "shops",
        select: "title description price image totalQuantity remainingQuantity educationID",
        options: { strictPopulate: false },
      },
      {
        path: "lastPayment",
        select: "managerName markazTitle lastPayment cashStatus cashType",
        options: { strictPopulate: false }
      }
    ]);
    return JSON.parse(JSON.stringify(educationData)); // frontga mos format
  } catch (error) {
    throw new Error(
      "Education center ma'lumotlarini olishda xatolik: " + error
    );
  }
};

export const getEducationAlls = async () => {
  try {
    await ConnectMonogDB();
    const education = await Education.find();
    return JSON.parse(JSON.stringify(education));
  } catch (error: any) {
    throw new Error("Error getEducation data");
  }
};

export const createAdministrator = async (
  data: IAdministrator,
  path: string
) => {
  try {
    await ConnectMonogDB();

    // 1. Foydalanuvchini yaratish
    const account = await AdministratorModel.create(data);

    // 2. EducationCenterga push qilish
    await Education.findByIdAndUpdate(data.educationCenter, {
      $push: { admins: account._id },
    });

    // 3. Revalidate qilish
    revalidatePath(path);

    return JSON.parse(JSON.stringify(account));
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error("Login allaqachon mavjud!");
    }
    throw new Error("Account yaratishda xatolik");
  }
};

export const paymentDaysAdd = async (payment: IPaymentAdd, path: string) => {
  try {
    await ConnectMonogDB();
    const paySucces = await PaymentAdd.create(payment);
    if (payment.educationCenterID) {
      await Education.findByIdAndUpdate(
        payment.educationCenterID,
        { $push: { lastPayment: paySucces._id } },
        { new: true }
      );
    }
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

export const getPaymentsLast = async () => {
  try {
    await ConnectMonogDB();
    const lastPayment = await PaymentAdd.findOne().sort({ createdAt: -1 }); // eng oxirgi to'lovlar birinchi chiqadi

    return lastPayment ? JSON.parse(JSON.stringify(lastPayment)) : null;
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


export const accountsDelete = async (userID: string, path: string) => {
  try {
    await ConnectMonogDB();
    const user = await CrmAccount.findById(userID);
    if (!user) {
      throw new Error("Foydalanuvchi topilmadi");
    }
    await CrmAccount.findByIdAndDelete(userID);
    revalidatePath(path);
  } catch (error) {
    throw new Error(`Xatolik yuz berid DELETE Userda, ${error}`)
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

"use server";

import ConnectMonogDB from "@/lib/mongodb";
import AdministratorModel from "@/models/administrator.model";
import { cookies } from "next/headers";


export const LoginAdmin = async (login: string, password: string) => {
  try {
    await ConnectMonogDB();
    const administrator = await AdministratorModel.findOne({ login });

    if (!administrator) {
      return null; // admin topilmadi
    }

    if (administrator.isBlocked) {
      return { isBlocked: true }; // bloklangan
    }

    if (administrator.password === password) {
      (await cookies()).set(
        "admin-auth",
        JSON.stringify({
          _id: administrator._id.toString(),
          role: administrator.role,
        }),
        {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 90,
        }
      );
      return {
        success: true, admin: {
          _id: administrator._id.toString(),
          fullname: administrator.fullname,
          login: administrator.login,
          phone: administrator.phone,
          role: administrator.role,
          isBlocked: administrator.isBlocked,
          educationCenter: administrator.educationCenter.toString(), // ObjectId bo‘lsa
        },
      }; // ✅ success = true
    }

    return null; // parol noto‘g‘ri

  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};



export const LogOutAdmin = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("admin-auth");
};

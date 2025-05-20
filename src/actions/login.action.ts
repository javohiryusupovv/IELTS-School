"use server";

import ConnectMonogDB from "@/lib/mongodb";
import AdministratorModel from "@/models/administrator.model";
import Education from "@/models/courseBox.model";
import { cookies } from "next/headers";

export const LoginAdmin = async (login: string, password: string) => {
  try {
    await ConnectMonogDB();

    // 1. Ownerni tekshirish
    const owner = await Education.findOne({ login });
    if (owner && owner.password === password) {
      (await cookies()).set(
        "admin-auth",
        JSON.stringify({
          _id: owner._id.toString(),
          role: owner.role,
          isOwner: true,
        }),
        {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 90,
        }
      );
      return true;
    }

    // 2. Administratorni tekshirish
    const administrator = await AdministratorModel.findOne({ login }).populate("educationCenter");
    if (administrator && administrator.password === password) {
      (await cookies()).set(
        "admin-auth",
        JSON.stringify({
          _id: administrator.educationCenter._id.toString(),
          role: administrator.role,
          isOwner: false,
        }),
        {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 90,
        }
      );
      return true;
    }

    // 3. Agar hech biri to‘g‘ri kelmasa
    throw new Error("Login yoki parol noto'g'ri");
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};


export const LogOutAdmin = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("admin-auth");
};

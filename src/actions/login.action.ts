"use server";

import ConnectMonogDB from "@/lib/mongodb";
import AdministratorModel from "@/models/administrator.model";
import { cookies } from "next/headers";

export const LoginAdmin = async (login: string, password: string) => {
  try {
    await ConnectMonogDB();
    const administrator = await AdministratorModel.findOne({ login })
    if (administrator && administrator.password === password) {
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

"use server";

import ConnectMonogDB from "@/lib/mongodb";
import Education from "@/models/courseBox.model";
import { cookies } from "next/headers";

export const LoginAdmin = async (
  login: string,
  password: string,
) => {
  try {
    await ConnectMonogDB();
    
    const admin = await Education.findOne({ login });

    if (!admin || admin.password !== password) {
      throw new Error("Login yoki parol noto‘g‘ri");
    }

    // Cookie saqlash
    (await cookies()).set("admin-auth", JSON.stringify({
      _id: admin._id.toString(),
      role: admin.role
    }), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 90, // 1:30 soat
    });

    return true;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};



export const LogOutAdmin = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("admin-auth");
};

"use server"

import ConnectMonogDB from "@/lib/mongodb"
import Admin from "@/models/admin.model";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";


export const LoginAdmin = async (login: string, password: string, path: string) => {
    try {
        await ConnectMonogDB();
        const admin = await Admin.findOne({ login, password })
        console.log(admin);
        
        if (!admin) {
            throw new Error("Admin not found");
        }

        (await cookies()).set("admin-auth", "true", {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 // 1 soat
          });
          


        revalidatePath(path)
        return {
            message: "Login successful",
            redirect: "/dashboard",
            admin: {
              login: admin.login,
              _id: admin._id.toString(),
            }
          }
    } catch (error) {
        console.error("Error during login:", error);
    }
}

export const LogOutAdmin = async () => {
    const cookieStore = await cookies();
  cookieStore.delete("admin-auth");
  }
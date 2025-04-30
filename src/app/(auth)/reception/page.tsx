"use client";

import { LoginAdmin } from "@/actions/login.action";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { LoaderCircle, Eye, EyeOff } from 'lucide-react';
import { useTopLoader } from "nextjs-toploader";
import Image from "next/image";
import LoginLogo from "../../../../public/logo/logo.png"



export default function ReceptionLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const pathname = usePathname();
  const [error, setError] = useState(false);
  const router = useRouter();
  const [isloading, setLoading] = useState(false);
  const topLoading = useTopLoader();
  const [eye, setEye] = useState(false);

  const hidePassword = () => {
    setEye(!eye);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const admin = await LoginAdmin(username, password, pathname);
      topLoading.start()
      if (admin) {
        // Teacher topilsa
        toast.success("Admin topildi", {
          duration: 2000,
          style: {
            height: "50px",
            color: "green",
            border: "1px solid #17be5a",
            backgroundColor: "white",
            boxShadow: "0 0px 5px #17be5a56",
          },
        })
        router.push("/dashboard");
      } else {
        // Teacher topilmasa
        router.push("/reception");
        toast.error("Admin topilmadi ...");
        setError(true);
        topLoading.done()
      }
    } catch (error) {
      console.error("Login qilinmadi Frontenda", error);
      setError(true)
    } finally {
      setLoading(false);
      topLoading.done()
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Image width={200} className="mb-8" src={LoginLogo} alt="Logo" />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >

        <div className="mb-4">
          <label className="block text-sm mb-1">Login</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
            className={`w-full px-3 py-2 border rounded-lg outline-none focus:border-[#3978ff] focus:shadow-sm focus:shadow-[#0000ff22] transition-all duration-200 ${error ? "border-red-500" : "border-gray-300"}`}
            required
          />
        </div>

        <div className="mb-6">
          <p className="text-sm mb-1">Password</p>
          <label className={`flex items-center justify-between w-full gap-5 overflow-hidden pr-3 border rounded-lg focus-within:border-[#3978ff] focus-within::shadow-sm focus-within::shadow-[#0000ff22] transition-all duration-200  ${error ? "border-red-500" : "border-gray-300"}`}>
            <input
              type={eye ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              className={`peer w-full h-full px-3 py-[10px] rounded-l-md outline-none`}
              required
            />
            <p className="cursor-pointer" onClick={hidePassword}>
              {eye ? <Eye /> : <EyeOff/>}
            </p>
          </label>
        </div>
        {isloading ? (
          <button
            type="button"
            disabled
            className="flex items-center justify-center gap-1 w-full bg-blue-600/60 text-white py-2 rounded-lg"
          >
            <LoaderCircle className="w-[20px] animate-spin"/>
            Qidirilmoqda...
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Kirish
          </button>
        )}
      </form>
    </div>
  );
}

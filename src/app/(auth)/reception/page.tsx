"use client";

import { LoginAdmin } from "@/actions/login.action";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { LoaderCircle } from 'lucide-react';
import { useTopLoader } from "nextjs-toploader";


export default function ReceptionLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const pathname = usePathname();
  const [error, setError] = useState(false);
  const router = useRouter();
  const [isloading, setLoading] = useState(false);
  const topLoading = useTopLoader()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const admin = await LoginAdmin(username, password, pathname);
      topLoading.start()
      if (admin) {
        // Teacher topilsa
        toast.success("Admin Topildi ...");
        router.push("/dashboard");
      } else {
        // Teacher topilmasa
        router.push("/reception");
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

        {error && <p className="text-red-500 mb-4">Xato login</p>}

        <div className="mb-4">
          <label className="block text-sm mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
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

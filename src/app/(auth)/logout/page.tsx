"use client";

import { LogoutTeacher } from "@/actions/teacher.check";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Logout() {
  const router = useRouter();
  const pathname = usePathname();
  const [isloading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        localStorage.removeItem("teacher");
        await LogoutTeacher(pathname);
        router.push("/login");
      } catch (error) {
        console.error("Logout paytida xatolik:", error);
        setLoading(false);
      }
    }, 1500);
  };
  return (
    <Button onClick={handleLogout} disabled={isloading} className="bg-red-600 text-white hover:bg-red-600/70">
      {isloading ? "Chiqmoqda..." : "Chiqish"}
    </Button>
  );
}

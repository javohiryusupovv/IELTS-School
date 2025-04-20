"use client"

import { Button } from "@/components/ui/button"
import Analitika from "./(analitika)/Analitika"
import { LogOutAdmin } from "@/actions/login.action"
import { useRouter } from "next/navigation"


function Dashboard() {
  const router = useRouter()

  const handleLogout = async () => {
    await LogOutAdmin()
    router.push("/reception") // logoutdan keyin reception sahifasiga qaytaradi
  }
  return (
    <div className="">
        <Button onClick={handleLogout}>LogOut</Button>
        <Analitika/>
    </div>
  )
}

export default Dashboard

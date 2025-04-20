'use client'

import { LoginAdmin } from '@/actions/login.action';
import { usePathname, useRouter } from 'next/navigation';
import {  useState } from 'react'
import { toast } from 'sonner';

export default function ReceptionLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');
  const pathname = usePathname()
  const [error, setError] = useState("");
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const admin = await LoginAdmin(username, password, pathname);
      if (admin) { // Teacher topilsa
        toast.success("Admin Topildi ...");
        router.push("/dashboard")
    } else { // Teacher topilmasa
        router.push("/reception")
        setError("Login is not")
    }
    }catch(error){
      console.error("Login qilinmadi Frontenda", error);
      setError("Login is invalid")
    }    
  }

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
        {error && <div>{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Kirish
        </button>
      </form>
    </div>
  )
}

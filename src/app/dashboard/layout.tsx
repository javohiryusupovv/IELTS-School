
import NavbarLayout from "./_components/navbarLayout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  
  

  return (
    <div className="flex w-full gap-4 pt-5 bg-gray-500/10">
      <NavbarLayout/>
      <main className="w-[calc(100%-250px)] mb-10 overflow-y-auto scrolbars mt-3 rounded-md">
        <div className="mr-[20px] p-5 bg-white min-h-screen">{children}</div>
      </main>
    </div>

  )
}

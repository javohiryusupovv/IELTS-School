
import NavbarLayout from "./_components/navbarLayout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  
  

  return (
    <div className="flex w-full gap-4 pt-5">
      <NavbarLayout/>
      <main className="w-[calc(100%-250px)] p-2 pt-5 mb-10 overflow-y-auto h-screen scrolbars  ">
        <div className="mr-[50px]">{children}</div>
      </main>
    </div>

  )
}

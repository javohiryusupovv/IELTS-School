import NavbarTeacher from "./_components/navbar"

export default async function Teacher({children}: {children: React.ReactNode}) {
  
  
  return (
    <div className="flex bg-[#f8f8f8] h-screen">
        <NavbarTeacher/>
        <div className="flex-grow ml-[160px] mr-[10px] mt-4 w-full mb-10">
            <main>{children}</main>
        </div>
    </div>
  )
}

import NavbarTeacher from "./_components/navbar"

export default async function Teacher({children}: {children: React.ReactNode}) {
  
  
  return (
    <div className="flex bg-white h-screen">
        <NavbarTeacher/>
        <div className="flex-grow ml-[180px] mr-[10px] mt-4 w-full mb-10">
            <main>{children}</main>
        </div>
    </div>
  )
}

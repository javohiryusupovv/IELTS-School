import NavbarTeacher from "./_components/navbar"

export default async function Teacher({children}: {children: React.ReactNode}) {
  
  
  return (
    <div className="flex bg-[#f8f8f8]">
        <NavbarTeacher/>
        <div className="flex-grow ml-[160px] transition-all duration-500 mr-[10px] mt-4 w-full bg-white shadow-md mb-10 rounded-xl">
            <main>{children}</main>
        </div>
    </div>
  )
}

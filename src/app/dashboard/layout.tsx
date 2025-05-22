import NavbarLayout from "./_components/navbarLayout";
import LMSLogo from "../../../public/logo/logo.png";
import "./custom.css";

import Image from "next/image";
import NotificationModal from "./_components/modal/notificationModal";
import ProfileAccount from "./_components/modal/profileAccount";
import { cookies } from "next/headers";
import ConnectMonogDB from "@/lib/mongodb";
import NavbarMedia from "./_components/navbarMedia";
import PaymentSend from "../crm/_components/PaymentDays";
import AdministratorModel from "@/models/administrator.model";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = (await cookies()).get("admin-auth");
  let adminData = null;
  
  if (cookie && cookie.value) {
    try {
      const adminInfo = JSON.parse(cookie.value); // contains _id, role, isOwner
      await ConnectMonogDB();
      const admin = await AdministratorModel.findById(adminInfo._id);
      if (admin) {
        adminData = {
          _id: admin._id.toString(),
          login: admin.login,
          password: admin.password,
          fullname: admin.fullname,
          phone: admin.phone,
          isBlocked: admin.isBlocked,
          role: admin.role
        }
      }
    } catch (error) {
      console.error("Error fetching admin data", error);
    }
  }

  return (
    <div className="sm:flex w-full sm:pt-5 pt-8 bg-gray-500/10">
      <div className="sm:hidden flex">
        <NavbarMedia />
      </div>
      <div className="sm:block flex">
        <NavbarLayout />
      </div>
      <main className="lg:w-[calc(100%-250px)] sm:w-[calc(100%-230px)] w-full md:mr-[20px] sm:mx-[10px] mx-1 mb-5 overflow-y-auto scrolbars sm:mt-3 mt-8 rounded-md">
        <div className="w-full flex justify-between items-center h-[60px] rounded-md bg-white mb-4 px-2">
          <article className="w-[120px] h-full flex items-center">
            <Image src={LMSLogo} alt="Logo Learning Center" />
          </article>
          <div className="flex gap-4 items-center">
            <NotificationModal />
            {adminData && <ProfileAccount admin={adminData} />}
          </div>
        </div>

        {/* <div className="w-full mb-4 overflow-hidden">
          <PaymentSend />
        </div> */}

        <div className="md:p-5 p-3 bg-white min-h-screen mb-4">{children}</div>

        <footer className="w-full py-5 px-4 border rounded-md bg-white">
          <a href="https://t.me/Javoxir_iq" target="_blank">
            <p className="flex gap-2 items-center justify-end text-end group cursor-pointer">
              <span className="anim">👋🏻</span> Tizimni ishlab chiquvchi:{" "}
              <span className="text-[20px] transition-all duration-200 font-medium group-hover:text-orange-500">
                Javokhir
              </span>
            </p>
          </a>
        </footer>
      </main>
    </div>
  );
}

import { Users, LayoutDashboard, FileText, Info, Video } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-72 shadow-lg min-h-screen sticky left-0 top-0 flex flex-col items-center">
      <div className="flex items-center justify-center py-6 mb-10">
        <Link href={"/crm"}>
          <h1 className="text-2xl font-bold">CRM</h1>
        </Link>
      </div>

      <nav className=" text-gray-700">
        <div className="flex  flex-col gap-y-10">
          <Link href="/crm/dashboard">
            <div className="flex items-center gap-2">
              <LayoutDashboard />
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
          </Link>
          <Link href="/crm/accounts">
            <div className="flex items-center gap-2">
              <Users />
              <h1 className="text-xl font-bold">Accounts</h1>
            </div>
          </Link>
          <Link href="/crm/documents">
            <div className="flex items-center gap-2">
              <FileText />
              <h1 className="text-xl font-bold">Documents</h1>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Video />
            <h1 className="text-xl font-bold">Videos</h1>
          </div>
          <div className="flex items-center gap-2">
            <Info />
            <h1 className="text-xl font-bold">Users</h1>
          </div>
        </div>
      </nav>
    </div>
  );
}

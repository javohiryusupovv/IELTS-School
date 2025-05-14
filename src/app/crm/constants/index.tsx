import { FileText, icons, Info, LayoutDashboard, Users, Video } from "lucide-react";


export const NvLinks =[
    {
        name:"Dashboard",
        href:"/crm/dashboard",
        icons: <LayoutDashboard />

    },
    {
        name: "Accounts",
        href: "/crm/accounts",
        icons: <Users />
    },
    {
        name:"Documents",
        href:"/crm/documents",
        icons:  <FileText />
    },
    {
        name: "Videos",
        href: "#",
        icons:  <Video />
    },
    {
        name: "Users",
        href: "#",
        icons: <Info />
    }
]

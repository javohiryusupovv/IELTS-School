export const dynamic = "force-dynamic";


import { getEducationData } from "@/actions/education.action";
import DialogsModal from "../_components/Modal";
import TableUsers from "./_components/action";

export default async function page() {
  const educationData = await getEducationData();
  
  return (
    <div className="w-11/12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-medium text-orange-500">
          LC accounts
        </h1>
        <DialogsModal educationData={educationData} />
      </div>
      <TableUsers/>
    </div>
  );
}

export const dynamic = "force-dynamic";


import { getEducationAlls, getEducationData } from "@/actions/education.action";
import EducationAction from "./_components/action";
import { IEducationCenter } from "../../../../app.types";

export default async function page() {
  const getEducation = await getEducationAlls();

  return (
    <div className="mr-10">
      <div className="flex items-end justify-end">
        <EducationAction />
      </div>
      <div className="overflow-x-auto rounded-xl bg-white p-6 shadow mb-9 mt-16">
        <table className="min-w-full table-auto text-left text-sm">
          <thead>
            <tr>
              <th className="py-3">Learning center</th>
              <th className="py-3">Owner</th>
              <th className="py-3">Number</th>
              <th className="py-3">Login</th>
              <th className="py-3">Password</th>
              <th className="py-3">Last payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {getEducation?.map((item: IEducationCenter) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="py-4">
                  <span className="font-medium text-gray-900">
                    {item.educationTitle}
                  </span>
                </td>
                <td className="py-4">
                  <span className="font-medium text-gray-900">
                    {item.ownerName}
                  </span>
                </td>
                <td className="py-4">
                  <span className="font-medium text-gray-900">
                    {item.phoneNumber}
                  </span>
                </td>
                <td className="py-4">
                  <span className="font-medium text-gray-900">
                    {item.login}
                  </span>
                </td>
                <td className="py-4">
                  <span className="font-medium text-gray-900">
                    {item.password}
                  </span>
                </td>
                <td className="py-4">
                  <span className="font-medium text-gray-900">19.12.2007</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

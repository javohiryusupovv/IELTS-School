import { getAccounts } from "@/actions/crmaccount.action";
import { ICRMAccount } from "../../../../app.types";

export default async function TableUsers() {

  const accounst = await getAccounts();

  return (
    <div>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">userName</th>
            <th className="border border-gray-300 px-4 py-2">Login</th>
            <th className="border border-gray-300 px-4 py-2">Password</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounst.map((account: ICRMAccount) => (
            <tr key={account._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">{account.fullname}</td>
              <td className="border border-gray-300 px-4 py-2">{account.login}</td>
              <td className="border border-gray-300 px-4 py-2">{account.password}</td>
              <td className="border border-gray-300 px-4 py-2">{account.role}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

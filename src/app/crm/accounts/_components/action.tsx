
import { getAccounts } from "@/actions/education.action";
import { IAdministrator } from "../../../../../app.types";
import DeleteReception from "./deleteReception";

export default async function TableUsers() {
  const accounst = await getAccounts();
  
  let countNumber = 1
  return (
    <div>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Ism-Familiya</th>
            <th className="border border-gray-300 px-4 py-2">Login</th>
            <th className="border border-gray-300 px-4 py-2">Password</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Options</th>
          </tr>
        </thead>
        <tbody>
          {accounst.map((account: IAdministrator) => (
            <tr key={account._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{countNumber++}</td>
              <td className="border border-gray-300 px-4 py-2">{account.fullname}</td>
              <td className="border border-gray-300 px-4 py-2">{account.login}</td>
              <td className="border border-gray-300 px-4 py-2">{account.password}</td>
              <td className="border border-gray-300 px-4 py-2">{account.role}</td>
              <td className="border border-gray-300 px-4 py-2">+998 {account.phone}</td>
              <td><DeleteReception accounst={account}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

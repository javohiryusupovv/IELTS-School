import React from "react";
import { CheckCircle, Clock } from "lucide-react";
import { getPayments } from "@/actions/crmaccount.action";
import { IPaymentAdd } from "../../../../app.types";
import ImageCoin from "../../../../public/icons/roleTeacher.png"
import Image from "next/image";


export default async function TableTransactions() {
    const product = await getPayments();

  return (
    <div className="overflow-x-auto rounded-xl bg-white p-6 shadow mb-9">
      <table className="min-w-full table-auto text-left text-sm">
        <thead>
          <tr className="text-gray-500">
            <th></th>
            <th className="py-3">Name</th>
            <th className="py-3">Assigned to</th>
            <th className="py-3">Last Transaction</th>
            <th className="py-3">Status</th>
            <th className="py-3">To'lov turi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {product.map((item: IPaymentAdd, id:number) => (
            <tr key={id} className="hover:bg-gray-50">
              <td className="p-4">
                <input type="checkbox" className="form-checkbox" />
              </td>
              <td className="flex items-center gap-3 py-4">
                <Image src={ImageCoin} alt={item.markazTitle} width={24} height={24} className="w-6 h-6"/>
                <span className="font-medium text-gray-900">{item.markazTitle}</span>
              </td>
              <td>
                <span className="text-gray-700">{item.managerName}</span>
              </td>
              <td>
                <div className="flex flex-col text-gray-700">
                  <span>{item.lastPayment}</span>
                </div>
              </td>
              <td>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                    item.cashStatus === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {item.cashStatus === "success" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                  {item.cashStatus}
                </span>
              </td>
              <td>
                <span className="text-gray-700">{item.cashType}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

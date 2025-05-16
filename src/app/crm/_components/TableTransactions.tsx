import React from "react";
import { CheckCircle, Clock } from "lucide-react";
import { data } from "./_constants";
import Image from "next/image";
import Link from "next/link";

export default function TableTransactions() {
  return (
    <div className="overflow-x-auto rounded-xl bg-white p-6 shadow mb-9">
      <table className="min-w-full table-auto text-left text-sm">
        <thead>
          <tr className="text-gray-500">
            <th></th>
            <th className="py-3">Name</th>
            <th className="py-3">Card</th>
            <th className="py-3">Assigned to</th>
            <th className="py-3">Last Transaction</th>
            <th className="py-3">Status</th>
            <th className="py-3">End Date</th>
            <th className="py-3">Total Used</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, id) => (
            <tr key={id} className="hover:bg-gray-50">
              <td className="p-4">
                <input type="checkbox" className="form-checkbox" />
              </td>
              <td className="flex items-center gap-3 py-4">
                {/* <Image src={item.icon} alt={item.name} width={24} height={24} className="w-6 h-6"/> */}
                <img src={item.icon} alt={item.icon} className="w-6 h-6" />
                <span className="font-medium text-gray-900">{item.name}</span>
              </td>
              <td className="text-gray-700">{item.card}</td>
              <td>
                <span className="text-gray-700">{item.assigned.name}</span>
              </td>
              <td>
                <div className="flex flex-col text-gray-700">
                  <span>{item.date}</span>
                  <span className="text-xs">{item.amount}</span>
                </div>
              </td>
              <td>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                    item.status === "Done"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {item.status === "Done" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                  {item.status}
                </span>
              </td>
              <td className="text-gray-700">{item.endDate}</td>
              <td className="font-semibold text-gray-800">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

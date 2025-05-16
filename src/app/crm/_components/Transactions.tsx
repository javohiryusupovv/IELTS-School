import { TbSquareRounded } from "react-icons/tb";
import SelectPage from "./SelectPage";
import { IoMdDownload } from "react-icons/io";
import TableTransactions from "./TableTransactions"

export default function Transactions() {
  return (
    <div>
      <h1 className="text-3xl pb-[20px] font-bold">Transactions</h1>
      <div className="flex justify-between pb-[26px]">
        <div className="flex items-center justify-between gap-10">
          <div>
            <input
              type="text"
              placeholder="Search for..."
              className="w-full py-1.5 pl-10 px-1.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <div className="flex items-center border rounded-lg">
                <p className=" border-r w-full py-1.5 pl-10 pr-5">Status</p>
                <TbSquareRounded className=" mx-3" size={30}/>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <SelectPage/>
            <IoMdDownload className=" border p-2 w-[40px] h-[40px] rounded-full bg-gray-600 text-white"/>
        </div>
      </div>
      <div>
        <TableTransactions/>
      </div>
    </div>
  );
}

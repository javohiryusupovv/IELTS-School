export const dynamic = "force-dynamic";


import Cards from "../_components/Cards";
import Transactions from "../_components/Transactions";

export default async function page() {
  
  return (
    <div className="mr-10">
        <Cards/>
        <Transactions/>
    </div>
  )
}

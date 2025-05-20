import Cards from "../_components/Cards";
import PaymentAdd from "../_components/payment/page";
import Transactions from "../_components/Transactions";

export default async function page() {
  
  return (
    <div className="mr-10">
        {/* O'quv markazlar to'lovlari */}
        {/* <PaymentAdd/> */}
        <Cards/>
        <Transactions/>
    </div>
  )
}

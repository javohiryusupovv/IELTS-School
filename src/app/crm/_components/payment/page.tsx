import { getEducationData } from "@/actions/education.action";
import PaymentModal from "./_components/action";

export default async function PaymentAdd() {
  const getEducation = await getEducationData();
  
  return (
    <div>
      <PaymentModal getEducation={getEducation}/>
    </div>
  )
}

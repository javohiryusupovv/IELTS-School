import { getEducationData } from "@/actions/crmaccount.action";
import CardAddProduct from "./_components/card-addProduct";

export default async function CreateProducts() {
  const education = await getEducationData()
  return (
    <div className="pt-10">
      <p className="text-center text-xl font-medium mb-20">Mahsulot qo'shish</p>
      <CardAddProduct educationData={education}/>
    </div>
  )
}

import Image from "next/image";
import Card from "../../../../public/students/card4.png";
import PaymentAdd from "../_components/payment/page";

export default function Cards() {
  return (
    <div className="mb-12">
      <h1 className="text-3xl pb-[20px] font-bold">Cards</h1>
      <div className="grid grid-cols-3 gap-10">
        <div>
          <Image
            src={Card}
            alt="Card Image"
            width={100}
            height={150}
            className="w-[360px] h-[200px] object-cover rounded-xl "
          />
        </div>
        <PaymentAdd/>
      </div>
    </div>
  );
}

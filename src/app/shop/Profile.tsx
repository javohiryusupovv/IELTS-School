
import Image from "next/image"
import AccountImg from "../../../public/accountImg/azizbek.jpg"

function Profile() {
    const user = "Qayumov Azizbek"
  return (
    <div className="flex items-center gap-3">
        <p className="text-[20px] hidden sm:flex">Salom, <span className="font-bold ml-2">{user}!</span></p>
        <article className="w-[50px] h-[50px] rounded-full bg-yellow-500 overflow-hidden">
          <Image src={AccountImg} alt="Account Img" />
        </article>
    </div>
  )
}

export default Profile

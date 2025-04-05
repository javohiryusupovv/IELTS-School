import { RxHamburgerMenu } from "react-icons/rx";
import Profile from "./Profile";
import Logo from "../../../public/icons/logod.png";
import Image from "next/image";

export default function Navbar() {
  return (
    <div>
      <nav className="flex justify-between w-full py-4 mb-10 border-b">
        <article className="flex items-center gap-4">
          <button>
            <RxHamburgerMenu className=" text-[22px]" />
          </button>
          <Image src={Logo} alt="Logo" />
        </article>
        <Profile />
      </nav>
    </div>
  );
}

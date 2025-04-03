import { ITeacher } from "@/types/type";
import Link from "next/link";
import { Fragment } from "react";


interface Props {
  teacher: ITeacher
}

function GroupCard({ teacher }: Props) {
  const coursesList = teacher ? teacher.courses : [];

  return (
    <div>
      <ul className="flex flex-col">
        {coursesList.map((routeCourse, id: number) => {
          const TitleSlice = routeCourse.courseTitle.split(" ").slice(0, 1)          
          return (
            <Fragment key={id}>
              <p className="w-full h-[1px] bg-[#0000003f]"></p>
              <li className={`group py-5 cursor-pointer pl-0`}>
                <Link href={`/teacher/${routeCourse._id}`} onClick={() => localStorage.setItem("kursID", routeCourse._id)}  className={`flex transition-all duration-300 flex-col gap-0 items-center`}>
                  <svg className={`w-[35px] h-[35px]`} viewBox="0 0 90 88" fill="none">
                    <path
                      d="M3.72729 32.7273L44.6364 10.9091L85.5455 32.7273L44.6364 54.5455L3.72729 32.7273Z"
                      stroke="black"
                      strokeWidth="3.54545"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:stroke-orange-600 transition-all duration-200"
                    />
                    <path
                      d="M65.0909 81.8182V43.6364L44.6364 32.7273"
                      stroke="black"
                      strokeWidth="3.54545"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:stroke-orange-600 transition-all duration-200"
                    />
                    <path
                      d="M76 37.818V56.4046C76.0011 56.993 75.8109 57.5657 75.4581 58.0365C73.1615 61.0925 63.4726 72.2725 44.6364 72.2725C25.8001 72.2725 16.1112 61.0925 13.8146 58.0365C13.4618 57.5657 13.2716 56.993 13.2727 56.4046V37.818"
                      stroke="black"
                      strokeWidth="3.54545"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:stroke-orange-600 transition-all duration-200"
                    />
                  </svg>
                  <p className={`font-light group-hover:text-orange-600 transition-all duration-200 text-[16px]`}>{TitleSlice}</p>
                </Link>
              </li>
            </Fragment>
          )
        }
        )}
      </ul>
    </div>
  );
}

export default GroupCard;


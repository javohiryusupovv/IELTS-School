import Image from "next/image";
import Frontend from "../../../../public/img/kursSchema.png";
import CreateCourse from "./CreateCourse";
import Link from "next/link";
import { getStableColor } from "../../../../constants/page";
import { FolderPlus } from 'lucide-react';
import { getEducationData } from "@/actions/education.action";


async function CourseAll() {
  const educationData = await getEducationData();
  const courses = educationData.courses;
  
  return (
    <div>
      <article className="flex justify-between items-center mb-3">
        <h6 className="font-semibold text-[26px]">Kurslar</h6>
        <CreateCourse/>
      </article>
      <hr className="mb-7" />
      {courses?.length < 1 && (
        <div className="w-full h-[80vh] flex flex-col gap-3 justify-center items-center">
          <FolderPlus className="w-14 h-10 stroke-gray-700 stroke-[1px]"/>
          <p className="text-[18px] text-gray-700">Kurs Qo'shing</p>
        </div>
      )}
        <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4">
          {courses?.map((item: any)=> {
            const titleS = item?.courseTitle?.split(" ")?.[0] || "NoTitle";
            return(
              <div key={item._id} className={`border drop-shadow-sm shadow-black rounded-lg overflow-hidden `}>
                <Link href={`/dashboard/courses/${item._id}`} className={`mb-4 relative flex top-0 left-0 w-full h-[200px] sm:h-[150px] md:h-[200px]`} style={{backgroundColor: getStableColor(item._id.toString())}}>
                  <p className="text-center w-full mt-12 text-[15px] font-semibold text-white">{item.courseTitle}</p>
                  <Image className="absolute bottom-0 left-0" src={Frontend} alt="Course Img" />
                </Link>
                <article className="px-7 py-2 md:py-4">
                  <p className="text-[18px] mb-2 line-clamp-1">{titleS}</p>
                </article>
              </div>
            )
          })}
        </div>
    </div>
  );
}

export default CourseAll;

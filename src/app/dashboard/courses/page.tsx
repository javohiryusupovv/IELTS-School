import Image from "next/image";
import Frontend from "../../../../public/img/kursSchema.png";
import CreateCourse from "./CreateCourse";
import Link from "next/link";
import { getStableColor } from "../../../../constants/page";
import { getCourses } from "@/actions/course.action";
import { FolderPlus } from 'lucide-react';


async function CourseAll() {
  const courses = await getCourses();
  return (
    <div>
      <article className="flex items-center justify-between mb-3">
        <h6 className="font-semibold text-[26px] max-md:text-[20px] max-sm:text-[17px]">Kurslar</h6>
        <CreateCourse/>
      </article>
      <hr className="mb-7" />
      {courses?.length < 1 && (
        <div className="w-full h-[80vh] flex flex-col gap-3 justify-center items-center">
          <FolderPlus className="w-14 h-10 stroke-gray-700 stroke-[1px]"/>
          <p className="text-[18px] text-gray-700">Kurs Qo'shing</p>
        </div>
      )}
        <div className="grid w-full gap-4 xl:grid-cols-4 lg:grid-cols-3">
          {courses?.map((item)=> {
            let titleS = item.courseTitle.split(" ")[0]          
            return(
              <div key={item._id} className={`border drop-shadow-sm shadow-black rounded-lg overflow-hidden `}>
                <Link href={`/dashboard/courses/${item._id}`} className={`mb-4 relative flex top-0 left-0 w-full h-[200px]`} style={{backgroundColor: getStableColor(item._id.toString())}}>
                  <p className="text-center w-full mt-12 text-[15px] font-semibold text-white">{item.courseTitle}</p>
                  <Image className="absolute bottom-0 left-0" src={Frontend} alt="Course Img" />
                </Link>
                <article className="py-4 px-7">
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

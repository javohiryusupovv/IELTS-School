
import Image from "next/image";
import Frontend from "../../../../../public/img/kursSchema.png";
import { getCourseById } from "@/actions/course.action";
import Actions from "./_components/actions";
import { getStableColor } from "../../../../../constants/page";



async function CourseDetail({ params, }: { params: Promise<{ kursId: string }> }) {
  const courseJSON = await getCourseById((await params).kursId)
  const course = JSON.parse(JSON.stringify(courseJSON))
  console.log(course);
  
  if (!course) {
    return <h1>Kurs topilmadi</h1>;
  }


  return (
    <div className={`w-full`}>
      <h5 className="mb-5 text-[25px] ">{course.courseTitle}</h5>
      <div className={`relative top-0 flex justify-center items-end border mb-5 w-[500px] h-[300px] rounded-xl`} style={{ backgroundColor: getStableColor(course._id) }}>
        <p className="absolute top-8 left-0 text-center w-full mt-12 text-[20px] font-semibold text-white">{course.courseTitle}</p>
        <Image className="w-[500px] object-cover" src={Frontend} alt="Course Detail Img" />
      </div>
      <h4 className="mb-3">O'qituvchi: <span className="font-semibold text-[19px]">{course.teacher.teacherName} {course.teacher.teacherSurname}</span></h4>
      <div className="flex items-center gap-3">
        <Actions course={course} />
      </div>
    </div>
  )
}

export default CourseDetail

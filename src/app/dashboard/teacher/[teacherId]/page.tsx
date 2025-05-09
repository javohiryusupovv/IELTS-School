import { getTeacherById } from "@/actions/teacher.action";
import Link from "next/link";
import TeacherLogo from "../../../../../public/icons/roleTeacher.png";
import Image from "next/image";
import CourseImg from "../../../../../public/img/kursSchema.png"
import { getStableColor } from "../../../../../constants/page";

export default async function DetailTeacher({
  params,
}: {
  params: Promise<{ teacherId: string }>;
}) {
  const teacher = await getTeacherById((await params).teacherId);
  console.log(teacher);

  return (
    <div>
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-start gap-10 max-md:flex-wrap">
          <div className="inline-flex items-center justify-center px-10 py-3 mb-5 rounded-xl bg-accent max-md:mb-0 max-md:pb-1">
            <Image width={170} src={TeacherLogo} alt="Teacher Icons" />
          </div>
          <div>
            <article className="flex items-start md:flex-col max-md:flex max-md:gap-3 max-sm:flex-wrap max-sm:gap-2">
              <h6 className="flex flex-col  gap-1 font-medium text-[16px] mb-4 max-md:mb-2">
                O'qituvchi:
                <span className="py-1 px-2 rounded-full text-[13px] font-normal bg-green-400 text-white">
                  {teacher.teacherName} {teacher.teacherSurname}
                </span>
              </h6>
              <h6 className="flex flex-col  gap-1 font-medium text-[16px] mb-4 max-md:mb-2">
                Telefon:
                <span className="py-1 px-2 rounded-full text-[13px] font-normal bg-green-400 text-white">
                  {teacher.teacherPhone}
                </span>
              </h6>
              <h6 className="flex flex-col gap-1 font-medium text-[16px]">
                Yaratilgan Vaqti:
                <span className="py-1 px-1 text-center rounded-full text-[13px] font-normal bg-yellow-400 text-white">
                  {new Date(teacher.createdAt).toISOString().split("T")[0]}
                </span>
              </h6>
            </article>
          </div>
        </div>
      </div>
      <div>
        <p className="flex gap-4 items-center text-[18px] font-medium mb-2">
          Kurslari:
          {teacher.courses.length < 1 ? (
            <span className="px-2 py-1 rounded-full bg-red-600 text-white text-[13px] font-light">
              Kurslar Yo'q !
            </span>
          ) : (
            ""
          )}
        </p>
        <div className="grid grid-cols-4 gap-3 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {teacher.courses.map((kurs: any, id: number)=> (
            <Link href={`/dashboard/courses/${kurs.id}`} key={id} className="relative top-0 left-0 py-[95px] rounded-md hover:shadow-md hover:shadow-gray-500/30 transition-all duration-200" style={{backgroundColor: getStableColor(kurs.id).toString()}}>
              <p className="absolute w-full font-semibold text-center text-white top-5">{kurs.courseTitle}</p>
              <article className="absolute bottom-0">
                <Image src={CourseImg} alt="Curs mg" />
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

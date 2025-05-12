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
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-start gap-10">
          <div className="inline-flex px-10 py-3 rounded-xl bg-accent items-center justify-center mb-5">
            <Image width={170} src={TeacherLogo} alt="Teacher Icons" />
          </div>
          <div>
            <article className="flex flex-col items-start">
              <h6 className="flex flex-col  gap-1 font-medium text-[16px] mb-4">
                O'qituvchi:
                <span className="py-1 px-2 rounded-full text-[13px] font-normal bg-green-400 text-white">
                  {teacher.teacherName} {teacher.teacherSurname}
                </span>
              </h6>
              <h6 className="flex flex-col  gap-1 font-medium text-[16px] mb-4">
                Telefon:
                <span className="py-1 px-2 rounded-full text-[13px] font-normal bg-green-400 text-white">
                  +998 {teacher.teacherPhone}
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
        <div className="grid grid-cols-4 gap-3">
          {teacher.courses.map((kurs: any, id: number)=> (
            <Link href={`/dashboard/courses/${kurs.id}`} key={id} className="relative top-0 left-0 py-[95px] rounded-md hover:shadow-md hover:shadow-gray-500/30 transition-all duration-200" style={{backgroundColor: getStableColor(kurs.id).toString()}}>
              <p className="text-center absolute top-5 w-full text-white font-semibold">{kurs.courseTitle}</p>
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

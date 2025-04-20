import { getTeacherById } from "@/actions/teacher.action";
import Link from "next/link";
import TeacherLogo from "../../../../../public/icons/roleTeacher.png";
import Image from "next/image";
import ResetPassword from "@/app/(auth)/resetPassword/resetPassword";

export default async function DetailTeacher({
  params,
}: {
  params: Promise<{ teacherId: string }>;
}) {
  const teacherJSON = await getTeacherById((await params).teacherId);
  const teacher = JSON.parse(JSON.stringify(teacherJSON));
  console.log(teacher);

  return (
    <div>
      <div className="flex gap-6">
        <div className="inline-flex px-10 py-3 rounded-xl bg-accent items-center justify-center mb-5">
          <Image width={170} src={TeacherLogo} alt="Teacher Icons" />
        </div>
        <div>
          <article className="flex flex-col items-start">
            <h6 className="flex items-center gap-3 font-medium text-[16px] mb-4">
              O'qituvchi:
              <span className="py-1 px-2 rounded-full text-[13px] font-normal bg-green-400 text-white">
                {teacher.teacherName} {teacher.teacherSurname}
              </span>
            </h6>
            <h6 className="flex items-center gap-3 font-medium text-[16px] mb-4">
              Telefon:
              <span className="py-1 px-2 rounded-full text-[13px] font-normal bg-green-400 text-white">
                +998 {teacher.teacherPhone}
              </span>
            </h6>
            <h6 className="flex items-center gap-3 font-medium text-[16px] mb-14">
              Yaratilgan Vaqti:
              <span className="py-1 px-2 rounded-full text-[13px] font-normal bg-yellow-400 text-white">
                {new Date(teacher.createdAt).toISOString().split("T")[0]}
              </span>
            </h6>
            <ResetPassword teacherRes={teacher._id}/>
          </article>
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
        {teacher.courses.map((kurs: any, id: number) => {
          return (
            <article
              key={id}
              className="group border border-transparent hover:bg-transparent hover:border-[#80808070] py-1 px-2 bg-accent rounded-md cursor-pointer mb-2 transition-all duration-300"
            >
              <Link href={`/login`}>
                <p className="group-hover:text-orange-400 transition-all duration-300">
                  {kurs.courseTitle}
                </p>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

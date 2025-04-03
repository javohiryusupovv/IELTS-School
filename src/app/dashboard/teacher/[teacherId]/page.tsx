import { getTeacherById } from "@/actions/teacher.action";
import Link from "next/link";
import TeacherLogo from "../../../../../public/icons/roleTeacher.png";
import Image from "next/image";

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
      <div className="inline-flex px-10 py-3 rounded-xl bg-accent items-center justify-center mb-5">
        <Image width={170} src={TeacherLogo} alt="Teacher Icons" />
      </div>
      <article className="mb-5">
        <h6 className="flex items-center gap-3 font-medium text-[18px]">
          O'qituvchi:{" "}
          <span className="py-1 px-2 rounded-full border text-[14px] font-normal bg-green-400 text-white">
            {teacher.teacherName} {teacher.teacherSurname}
          </span>
        </h6>
      </article>
      <div>
        <p className="flex gap-4 items-center text-[18px] font-medium mb-2">
          Kurslari:{" "}
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
              <Link href={`/teacher`}>
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

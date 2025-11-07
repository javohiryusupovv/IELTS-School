import StudentForm from "../_components/card/student-form";
import { SearchFuture } from "./_components/action";
import { UserX } from "lucide-react";
import { getEducationData } from "@/actions/education.action";
import TableStudent from "./_components/tableStudent";

export default async function StudentAll() {
  const educationData = await getEducationData();
  const propCourses = educationData.courses;
  const students = educationData.students;
  const totalStudents = students.length;

  return (
    <div>
      <article className="items-center justify-between mb-3 max-sm:hidden sm:hidden OurMentor2:flex">
        <h6 className=" font-semibold lg:text-[26px] text-[23px]">
          Bizning Talabalar
        </h6>
        <div className="">
          <SearchFuture studentList={students} />
        </div>
        <div className="">
          <StudentForm propCourses={propCourses} />
        </div>
      </article>
      <article className="flex-col items-start justify-between w-full mb-10 sm:flex OurMentor2:hidden">
        <article className="flex justify-between w-full mb-5">
          <h6 className="font-semibold lg:text-[26px] text-[23px]">
            Bizning Talabalar
          </h6>
          <div className="">
            <StudentForm propCourses={propCourses} />
          </div>
        </article>
        <div className="w-full">
          <SearchFuture studentList={students} />
        </div>
      </article>

      <hr className="mb-7" />
      <div className="w-full">
        <div className="mb-5 flex items-center justify-between">
          <article className="flex gap-5 items-center">
            <p className="flex items-center gap-4">
              <span className="w-4 h-4 bg-green-500 inline-block"></span> Activ
            </p>
            <p className="flex items-center gap-4">
              <span className="w-4 h-4 bg-red-500 inline-block"></span> Arxiv
            </p>
          </article>
          <p className="font-semibold text-[18px]">Platformadagi o'quvchilar: <span className="text-orange-500 underline">{totalStudents} ta</span></p>
        </div>
        {totalStudents < 1 ? (
          <div className="w-full h-[80vh] flex gap-2 flex-col justify-center items-center">
            <UserX className="w-[50px] h-10 stroke-gray-500 stroke-[0.9px]" />
            <p className="text-center text-gray-500 text-lg">
              Talabalar topilmadi
            </p>
          </div>
        ) : (
          <TableStudent students={students} courses={propCourses} />
        )}
      </div>
    </div>
  );
}

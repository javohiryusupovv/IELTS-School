import { getCourses } from "@/actions/course.action";
import StudentForm from "../_components/card/student-form";
import Action from "./_components/action";
import { UserX } from 'lucide-react';
import { getStudents } from "@/actions/student.action";


export default async function StudentAll() {
  let course = "Frontend Dasturlash";
  let courseArray = course.split(" ").slice(0, 1);

  const courses = await getCourses();
  const propCourses = JSON.parse(JSON.stringify(courses));
  const students = await getStudents();

  const studentList = students.flatMap((course) => course.students);


  // Barcha studentlarni sanash
  const totalStudents = studentList.length

  return (
    <div>
      <article className="flex justify-between items-center mb-3">
        <h6 className="font-semibold text-[26px]">Bizning Talabalar</h6>
        <StudentForm propCourses={propCourses} />
      </article>
      <hr className="mb-7" />
      <div className="w-full">
        {totalStudents < 1 ? (
          <div className="w-full h-[80vh] flex gap-2 flex-col justify-center items-center">
            <UserX className="w-[50px] h-10 stroke-gray-500 stroke-[0.9px]" />
            <p className="text-center text-gray-500 text-lg">Studentlar topilmadi</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border">
                <th className="pl-2 font-semibold py-3">№</th>
                <th className="py-3 px-3">Ism - Familiya</th>
                <th className="py-3">Course</th>
                <th className="py-3">Phone</th>
              </tr>
            </thead>
            <tbody>
              {students.flatMap((course: any) => course.students.map((student: any, id: number) => (
                <tr key={student._id || id} className="border">
                  <td className="py-2 text-[14px] font-medium px-3">{id + 1}</td>
                  <td className="py-2 text-[14px] font-normal px-3">{student.name} {student.surname}</td>
                  <td className="py-2 text-[14px] font-normal">{course.courseTitle}</td>
                  <td className="py-2 text-[14px] font-normal">{student.phone}</td>
                  <td className="py-2">
                    <Action studentId={student._id} courseId={course._id} />
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}


import Talabalar from "./_components/_students"
import Mentorlar from "./_components/_mentors"
import Filiallar from "./_components/_filiallar"
import { getStudents } from "@/actions/student.action";
import { getTeachers } from "@/actions/teacher.action";

export default async function Analitika() {
  const getStudentsValue = await getStudents();
  const getTeacher = await getTeachers()
  console.log(getStudentsValue);
  
  return (
    <div>
      <p className="mb-[16px] font-semibold text-[20px]">Analitika</p>
      <div className="grid grid-cols-3 gap-4">
        <Talabalar getStudentsValue={getStudentsValue}/>
        <Mentorlar getTeacher={getTeacher}/>
        <Filiallar/>
      </div>
    </div>
  )
}

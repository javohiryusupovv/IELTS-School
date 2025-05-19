import Talabalar from "./_components/_students";
import Mentorlar from "./_components/_mentors";
import Filiallar from "./_components/_filiallar";
import { getEducationData } from "@/actions/crmaccount.action";

export default async function Analitika() {
  const educationData = await getEducationData();
  const getTeacher = educationData.teachers
  const getStudents = educationData.students
  return (
    <div>
      <p className="mb-[16px] font-semibold text-[20px] max-lg:text-[19px] max-md:text-[18px] max-sm:text-[17x]">
        Analitika
      </p>
      <div className="grid grid-cols-1 medSmall:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4 gap-4 mb-10">
        <Talabalar getStudentsValue={getStudents} />
        <Mentorlar getTeacher={getTeacher} />
        <Filiallar />
      </div>
    </div>
  );
}

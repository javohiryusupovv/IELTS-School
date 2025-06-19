import { getStudentById } from "@/actions/student.action";
import Actions from "./_components/action";
import { getEducationData } from "@/actions/education.action";

export default async function DetailStudent({ params, }: { params: Promise<{ studentID: string }> }) {
    const studentJSDON = await getStudentById((await params).studentID) 
    const student  = JSON.parse(JSON.stringify(studentJSDON));
    const educationData = await getEducationData();
    const courses = educationData.courses
    
  
    return (
    <div>
      <Actions student={student} courses={courses} />
    </div>
  )
}

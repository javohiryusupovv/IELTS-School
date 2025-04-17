import { getStudentById } from "@/actions/student.action";
import Actions from "./_components/action";

export default async function DetailStudent({ params, }: { params: Promise<{ studentID: string }> }) {
    const studentJSDON = await getStudentById((await params).studentID) 
    const student  = JSON.parse(JSON.stringify(studentJSDON))
    console.log(student);
    
    
  
    return (
    <div>
      <Actions student={student} />
    </div>
  )
}

import { getCourses } from "@/actions/course.action";
import Attendence from "./section/attendence"
import { getStudents } from "@/actions/student.action"
import { CalendarDayGet } from "./_components/CalendarDayGet";


async function GroupDashboard() {
  const students = await getStudents();
  const courses = await getCourses();
  let dayCourses = courses[1].days
  
  
  return (
    <div>
      <Attendence students={students} days={dayCourses}/>
    </div>
  )
}

export default GroupDashboard
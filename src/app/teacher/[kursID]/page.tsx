import { getCourseById } from "@/actions/course.action";
import Attendence from "../_components/section/attendence";

export default async function KursDetai({ params, }: { params: Promise<{ kursID: string }> }) {
    const courseJSON = await getCourseById((await params).kursID)
    const course = JSON.parse(JSON.stringify(courseJSON))

    const days = course.days;
    const students = course.students;
    const titleCourse = course.courseTitle;
    const teacherName = course.teacher.teacherSurname + " " + course.teacher.teacherName;
    const roleTeacher = course.teacher.role

    if(course === null){
        return <h6>Siz Qidirgan ma'lumotlar hali yaratilmagan</h6>
    }
    
  return (
    <div>
        <Attendence course={course} students={students} days={days} titleCourse={titleCourse} teacherName={teacherName} roleTeacher={roleTeacher} />
    </div>
  )
}

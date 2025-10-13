
import { getEducationData } from "@/actions/education.action"
import Analitika from "./(analitika)/Analitika"
import CoinChartToday from "./_components/ChartCoins/CoinChartToday"
import QarzdorStudents from "./_components/Qarzdor/QarzdorStudents"


async function Dashboard() {
  const educationData = await getEducationData()
  const getStudents = educationData.students;
  const course = educationData.courses;
  
  
  return (
    <div className="grid grid-cols-3 max-strelka:grid-cols-1 max-strelka:gap-0 gap-4">
      <div className="col-span-2 max-strelka:mb-5">
        <Analitika />
        <CoinChartToday/>
      </div>
      <QarzdorStudents students={getStudents}/>
    </div>
  )
}

export default Dashboard

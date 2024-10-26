
import { StudentRegGraph, StudentSuccessGraph } from "@/components/dashboard/dashboard-radial"
import { StudentBarGraph } from "@/components/dashboard/dashboard-bar"
import { FemaleStudents, MaleStudents, SuccessfulStudents } from "@/components/dashboard/dashboard-card"

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <MaleStudents/>
        <FemaleStudents/>
        <SuccessfulStudents/>
      </div>

    <div className="flex gap-4 flex-col md:flex md:flex-row">
        {/* bar chart */}
        <StudentBarGraph/>
        {/* radial charts */}
        <div className="flex flex-col gap-2 md:min-h-4/5 h-[500px] md:w-1/2 w-full">

      <StudentRegGraph/>
      <StudentSuccessGraph/>
        </div>
    </div>
    </div>
  )
}

export default Dashboard
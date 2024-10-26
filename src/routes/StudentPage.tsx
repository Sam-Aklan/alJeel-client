import { useLevels } from "@/api/level"
import { useDeleteStudent, usePaginatedStudents } from "@/api/student"
import BottomHandlers from "@/components/student/BottomHandlers"
import { useStudentFilters } from "@/components/student/hooks/useStudentFilters"
import { StudentSearchbar } from "@/components/student/StudentSearchbar"
import { StudentTable } from "@/components/student/StudentTable"
import {StudentType } from "@/types/student"
import { XIcon } from "lucide-react"
import { useEffect, useMemo } from "react"

export const StudentPage = () => {
  const {name,levelId,pageLimit,page,} = useStudentFilters()
  const studentDel = useDeleteStudent()
  console.log("student page url params: ",{name,levelId})
  const studentPayload = usePaginatedStudents({name,levelId,page:page,pageLimit:pageLimit,isEnabled:false})
  
  useEffect(()=>{studentPayload.refetch()},
  [name,levelId,page,pageLimit,studentDel]
)
  const levelsPayload = useLevels()
  const studentsData = studentPayload?.data?.students
  console.log(`student Data:`,studentPayload?.data)
  const students = useMemo(()=>{
    if(!studentsData) return undefined
    return studentsData.map(({id,name,imagePath,level,dateOfBirth}:StudentType)=>{
     return {id,
      name,
      imagePath,
      dateOfBirth: new Date(dateOfBirth),
      levelId:level.id,
      levelName:level.levelName,}
    })
  },[studentsData])

  const searchAndPaginate = ()=> studentPayload.refetch()
  const deleteStudent = async(id:string)=> await studentDel.mutateAsync(id)
  // students && console.log("normalized students:",students[0])
  return (
    <div className="container flex justify-center items-center">
        {/* <EmployeeTable/> */}
        {
          studentPayload.isLoading && <div>loading...</div>
        }
        {
          studentPayload.error instanceof Error && (<div className='flex gap-1 justify-center items-center'>
            <XIcon width={`15px`} height={`15px`} className='bg-danger text-[#fff] rounded-full'/>
          <p>
          {studentPayload.error.message}
          </p>
            </div>)
        }
        {
          // studentPayload?.data && levelsPayload?.data&&<div>{JSON.stringify(studentPayload.data)}***{JSON.stringify(levelsPayload.data?.levels)}</div>
        }
        {
          studentPayload?.data && levelsPayload?.data&& 
          <div className="flex flex-col gap-4 ">
            <StudentSearchbar 
          levels={levelsPayload?.data?.levels} 
          searchAndPaginate={searchAndPaginate}
          studentCount={students?.length}
          />
          <StudentTable 
          students={students}
          levels={levelsPayload?.data?.levels}
          totalCount={Number(studentPayload?.data?.totalCount)}
          currentPage={Number(studentPayload?.data?.currentPage)}
          isNext={Boolean(studentPayload?.data?.isNext)}
          prevouisPage={Number(studentPayload?.data?.prevouisPage)}
          deleteStudent={deleteStudent}
          />
          <BottomHandlers
          currentPage={Number(studentPayload?.data?.currentPage)}
          isNext={studentPayload?.data?.isNext}
          prevouisPage={studentPayload?.data?.prevouisPage}
          pages={Number(studentPayload?.data?.totalCount)}
          />
            </div>
          // studentPayload?.data && levelsPayload?.data&& 
          
          // <EmployeeTable/>
        }
    </div>
  )
}

import { useMemo,} from "react"
// import {DataTableExp} from '@/components/reusable/DataTableExp'

import {  useTeachers } from "@/api/teacher"
import { TeacherPayload } from "@/types/teacher"

import TeacherTable from "@/components/teacher/TeacherTable"


 
const TeachersPage = () => {
   
    const teachers = useTeachers()
    const specializations:string[]|undefined = useMemo(()=>{
      if(!teachers?.data?.teachers) return undefined
      const spec = Array.from(new Set<string>(teachers?.data?.teachers.map((t:TeacherPayload)=>t.specialization)).values())
      return spec
    },[teachers?.data?.teachers])
    console.log(teachers.data)
    return (
      <div className="container mx-auto py-10">
        
        {teachers.isLoading &&(
          <div className="py-2 text-primary-color">loading...</div>
        )}
        {
          teachers.error instanceof Error && (
            <div className="text-danger-color italic">{teachers.error.message}</div>
          )
        }
        {teachers.isSuccess &&(
          <TeacherTable teacherPayload={teachers?.data?.teachers} specOptions={specializations}/>
        )}
      </div>
    )
}

export default TeachersPage
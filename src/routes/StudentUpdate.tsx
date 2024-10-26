import { useLevels } from "@/api/level"
import { useStudent } from "@/api/student"
import { StudentForm } from "@/components/student/StudentForm"
import { useMemo } from "react"

const StudentUpdate = () => {
    const student= useStudent()
    const levels= useLevels()

    const image =useMemo(()=>{
        if(student?.data?.imagePath){
            const fileUrl = URL.createObjectURL(new Blob([student.data.imagePath]))
            const imgext = student.data.imagePath.split('_')[1].split('.')[1]
            const imgFile = new File([fileUrl],student.data.imagePath,{type:`image/${imgext}`})
            return imgFile
        }
        return undefined
    },[student.data])

    console.log("image file",image)
    
  return (
    <div>

        {student.isLoading?<div>loading...</div>:undefined
        }
        {
            student.error instanceof Error?<div>
                {student.error.message}
            </div>:undefined
        }
        {
            student.data&&levels.data?(
            <StudentForm
            levels={levels.data.levels}
            studentPayload={{
                id:student.data.id,
                name:student.data.name,
                levelId:student.data.levelId,
                dateOfBirth:student.data.dateOfBirth,
                image:image
            }}/>
        ):undefined
        }
    </div>
    
  )
}

export default StudentUpdate
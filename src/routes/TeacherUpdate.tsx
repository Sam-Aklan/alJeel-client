
import { useEditTeacher, useTeacher } from "@/api/teacher"
import TeacherUpdateForm from "@/components/teacher/TeacherUpdateForm"
import {  UpdateTeacher } from "@/types/teacher"
const TeacherUpdate = () => {
    const teacher = useTeacher()
    console.log(teacher?.data?.message)
    const editTeacher = useEditTeacher()
    const onSubmit = async({id,name,specialization}:UpdateTeacher)=> await editTeacher.mutateAsync({id,name,specialization})
    return(
      <>
         {teacher.isLoading && (
                <div>loading....</div>
            )}
          {teacher.error instanceof Error && (
                <div>{teacher.error.message}</div>
            )}
            <div className=" flex flex-col w-full justify-center">
            {
              teacher?.data?.message &&(
                <TeacherUpdateForm
                  teacherInfo={teacher.data.message}
                  sumbitText="تعديل"
                  formText="تعديل استاذ/ة"
                  submitAction={onSubmit}
                  pending={editTeacher.isPending}
                />
              )
            }
            {
              editTeacher.error instanceof Error &&(
                <div className="text-center justify-center bg-danger-color rounded-md w-[50%] p-2">
                  <p className="text-[#fff]">
                    {editTeacher.error.message}
                  </p>
                </div>
              )
            }

            </div>
      </>
    )
    
  
}

export default TeacherUpdate
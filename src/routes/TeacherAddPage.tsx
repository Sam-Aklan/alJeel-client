import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormField,
  FormLabel,
  useFormField,
} from "@/components/ui/form"
import { teacherSchema } from "@/types/teacher/teacherAddSchema"
import { useCreateTeacher } from "@/api/teacher"
import { Button, Input } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
const TeacherAddPage = () => {
    const form = useForm<z.infer<typeof teacherSchema>>({
        resolver: zodResolver(teacherSchema),
        defaultValues: {
          teacherName:'',
          specialization:''
        },
      })
      const createTeacher = useCreateTeacher()
      const navigate = useNavigate()
      async function onSubmit(values: z.infer<typeof teacherSchema>) {

        await createTeacher.mutate({...values})
        setTimeout(()=>{
          navigate('/teachers')
        },1000)
      }
      return (
        <div className="flex flex-1 flex-col w-full">
          <label className=" flex justify-end text-lg font-semibold m-10">
          اضافة استاذ/ة
          </label>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full flex flex-col gap-1 justify-center items-center">
            <FormField
              control={form.control}
              name="teacherName"
              render={({ field }) => {
                const {error} = useFormField()
                return(
                  <div className="w-[50%] flex flex-col gap-2">
                  <FormLabel className="flex justify-end">الاسم</FormLabel>
                  <Input
                  errorMessage={error?.message}
                  isInvalid={!!error?.message}
                  {...field}/>
                  </div>
                )
              }}
            />
            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => {
                const {error} = useFormField()
                return(
                  <div className="w-[50%] flex flex-col gap-2">
                  <FormLabel className="flex justify-end">التخصص</FormLabel>
                  <Input
                  errorMessage={error?.message}
                  isInvalid={!!error?.message}
                  {...field}/>
                  </div>
                )
              }}
            />
            <div className="w-[50%] flex justify-end">

            <Button 
            disabled={createTeacher.isPending}
            type="submit"
            color="primary"
            radius="sm">
              ارسال
            </Button>
            </div>
          </form>
        </Form>
        {
          createTeacher.error instanceof Error&&(
            <div className="flex justify-center items-center ">
             <p className="text-center text-[#fff] bg-danger-color borde border-sucess-color m-3 p-4 rounded-md">
              {createTeacher.error.message}
              </p> 
            </div>
          )
        }
        </div>
      )
}

export default TeacherAddPage
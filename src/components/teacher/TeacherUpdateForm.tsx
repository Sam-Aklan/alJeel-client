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
import { TeacherPayload } from "@/types/teacher"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { Button, Input } from "@nextui-org/react"
interface Props{
    teacherInfo:TeacherPayload,
    formText:string,
    sumbitText:string,
    pending:boolean,
    submitAction:(data:any)=> any
}
const teacherUpdateSchema =  teacherSchema.partial()
const TeacherUpdateForm = ({teacherInfo,
    formText,
    sumbitText,
    submitAction,
    pending}:Props) => {
        const navigate = useNavigate()
    const form = useForm<z.infer<typeof teacherUpdateSchema>>({
        resolver: zodResolver(teacherSchema),
        defaultValues: {
            teacherName:teacherInfo.teacherName||'',
          specialization:teacherInfo.specialization||'',
        },
      })
  
      async function onSubmit(values: z.infer<typeof teacherUpdateSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        
        if(teacherInfo.teacherName===values.teacherName&&teacherInfo.specialization===values.specialization){
            toast.warning('لم يتم تحديث اي بيانات')
            return
        }
        let updatedInfo:z.infer<typeof teacherUpdateSchema>&{id:string}= {id:teacherInfo.id,teacherName:undefined,specialization:undefined}
        if (values.teacherName) updatedInfo.teacherName=values.teacherName
        if(values.specialization) updatedInfo.specialization = values.specialization
        await submitAction(updatedInfo)
        toast.success('تم تعديل البيانات بنجاح')
        setTimeout(() => {
            navigate('/teachers')
        }, 1000);
      }
      return (
        <div className="flex flex-1 flex-col w-full">
          <label className=" flex justify-end text-lg font-semibold m-10">
                {formText}
          </label>
          
      
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full flex flex-col gap-1 justify-center items-center">
            <FormField
              control={form.control}
              name="teacherName"
              render={({ field }) => {
                const{error} = useFormField()
                return(
                  <div
                className="w-[50%] flex flex-col gap-2">
                  <FormLabel className="flex justify-end ">الاسم</FormLabel>
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
                <div
                className="w-[50%] flex flex-col gap-2">
                  <FormLabel className="flex justify-end ">التخصص</FormLabel>
                    <Input 
                    errorMessage={error?.message}
                    isInvalid={!!error?.message}
                    {...field}/>
                </div>
              )}}
            />
            <div className="w-[50%] flex justify-end">
      
            <Button 
            disabled={pending}
            type="submit" className="ring-0 focus:ring-0"
            color="primary">{
              sumbitText}
              </Button>
            </div>
          </form>
        </Form>
          
          
        </div>
      )
}

export default TeacherUpdateForm

  
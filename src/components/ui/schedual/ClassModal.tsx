import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  useFormField,
} from "@/components/ui/form"
import 'moment/dist/locale/ar-sa'
import { lectureAddSchema } from "@/types/formSchema/lectureAddSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { classesAction } from "@/constants/events";
import { useLevelCourse } from "@/api/levelCourse/use-levelCourse";
import { useLectureTimes } from "@/api/lectureTime/use-lectureTimes";
import { useCreateLecture, useDeleteLecture, useEditLecture} from "@/api/lecture";
import { Select, SelectItem } from "@nextui-org/select";

interface ClassFormInterface{
  onCancel:()=>void;
  onSave: ()=>void;
  eventDetails:classesAction |null
}
type subjectType = {
  id:number,
  course:{courseName:string}
}
type lectureTimeType = {
  id:string,
  lectureTimeName:string
}
const lectureUpdateSchema = lectureAddSchema.partial()
export function ClassForm({eventDetails}:ClassFormInterface) {
  // const {levelId} = useParams()
  console.log("event details", eventDetails)
const newLecture =useCreateLecture()
const editLecture = useEditLecture()
const subjects = useLevelCourse()
const lectureTimes = useLectureTimes()
const deleteQuery = useDeleteLecture()

  const form = useForm<z.infer<typeof lectureAddSchema>>({
    resolver:zodResolver (lectureAddSchema),
    defaultValues:{
      subject:eventDetails?.id? eventDetails.courseId:undefined,
      lectureTime:eventDetails?.id?eventDetails.lectureTimeId:undefined,
    }
  })
  async function addEvent(data:z.infer<typeof lectureAddSchema>){
    
    if(!eventDetails?.start){
      toast.error('لم يتم تحديد التاريخ')
      return
    }
   
    await newLecture.mutateAsync({
      lectureDate:new Date(eventDetails.start.setHours(0,0,0)),
      levelCourseId:data.subject,
      timeId:data.lectureTime})
  }
  
  const editEvent = async (data:z.infer<typeof lectureUpdateSchema>)=>{

    if(!eventDetails?.id){
      toast.error('لا توجد حصة لحذفها')
      return
    }
    if(data.lectureTime === eventDetails?.lectureTimeId && data.subject === eventDetails?.courseId) {
      toast.warning("لم يتم تحديث البيانات")
    return
    }
    let classToUpdate:{timeId:string|undefined,levelCourseId:number|undefined}={timeId:undefined,levelCourseId:undefined}
    if(data.lectureTime && data.lectureTime !==eventDetails?.lectureTimeId){
       classToUpdate.timeId = data.lectureTime
      }
      if (data.subject && data.subject !==eventDetails?.courseId) {
        classToUpdate.levelCourseId = data.subject
      }
      console.log(typeof eventDetails?.id)
      await editLecture.mutateAsync({id:eventDetails?.id,...classToUpdate})
      
    }

  return (
    <>
    {
      
         subjects?.data &&lectureTimes?.data && <Form {...form} >
            <form onSubmit={eventDetails?.id?form.handleSubmit(editEvent):form.handleSubmit(addEvent)}>
              <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">

                {/* subject dropdown */}
                <FormField
                control={form.control}
                name="subject"
                render={() => {
                  const {error} = useFormField()
                  return(
                  <Select
                  items={subjects?.data}
                  color="primary"
                  label="المادة"
                  placeholder=""
                  dir="rtl"
                  onSelectionChange={(e)=>form.setValue('subject',Number(e.currentKey)||-1)}
                  labelPlacement="outside"
                  errorMessage={error?.message}
                  isInvalid={!!error?.message}>
                    {(subject:subjectType)=> <SelectItem key={subject?.id}>
                      {subject.course.courseName}
                      </SelectItem>}
                  </Select>
                )}}
              />

                {/* classes times dropdown */}

                <FormField
                control={form.control}
                name="lectureTime"
                render={() => {
                  const {error} = useFormField()
                  return(
                  <Select
                  items={lectureTimes?.data}
                  color="primary"
                  label="الوقت"
                  placeholder=""
                  dir="rtl"
                  onSelectionChange={(e)=>form.setValue('lectureTime',e.currentKey||'-1')}
                  labelPlacement="outside"
                  errorMessage={error?.message}
                  isInvalid={!!error?.message}>
                    {(lectureTime:lectureTimeType)=> <SelectItem key={lectureTime?.id}>
                      {lectureTime.lectureTimeName}
                      </SelectItem>}
                  </Select>
                )}
              }
              />
              
              </div>
              <div className="flex gap-2">
                
                <Button type="submit" 
                className="w-[20%] bg-primary-color justify-end"
                disabled={form.formState.isSubmitting || deleteQuery.isPending}
                >{eventDetails?.courseId?"تعديل":"حفظ"}
                </Button>
                  {eventDetails?.id&& <Button type="button" 
                  className="w-[20%] bg-danger-color text-white" 
                  onClick={(async()=>{ 
                    if (eventDetails.id) {
                      
                      await deleteQuery.mutateAsync(eventDetails?.id)
                    }
                  })}
                  disabled={form.formState.isSubmitting || deleteQuery.isPending}
                  >حذف
                  </Button>}
              </div>
              </div>
                
                
            </form>

          </Form>
    }
    </>
      )
}

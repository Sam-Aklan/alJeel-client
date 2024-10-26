import { useLecture } from "@/api/lecture"
import ClassSchedualer from "@/components/ui/schedual/ClassSchedualer"
import { classesInterface } from "@/constants/events"
import { useEffect, useMemo } from "react"

type classType = {
  id:string,
  lectureDate:string,
  levelCourse:{id:number,course:{
    courseName:string,
  }},
  lectureTime:{
    lectureTimeName:string,
    startTime:string,
    endTime:string,
    id:string
  }
}

const LevelClassPage = () => {
// const someDate = new Date(2024,7,28)
  const lectures = useLecture()
  const classesEvents = useMemo(():classesInterface[]|undefined=>{
    if (!lectures?.data) {
      return undefined
    }
    const classes:classesInterface[] = lectures?.data.map((c:classType)=>{
      
      const newDate= new Date (new Date(c.lectureDate).toISOString())
      const newStart = new Date(c.lectureTime.startTime)
      const newEnd = new Date(c.lectureTime.endTime)
      
      return{
        id:c.id,
        title:c.levelCourse.course.courseName||'',
        start:new Date(newDate.setHours(newStart.getHours(),newStart.getMinutes())),
        end:new Date(newDate.setHours(newEnd.getHours(),newEnd.getMinutes())),
        courseId:c.levelCourse.id,
        lectureTimeId:c.lectureTime.id
      }
      
    })
   return classes.sort((a,b)=> b.start.getDate()- a.start.getDate())

  },[lectures])

  if(classesEvents?.length) console.log("class events", classesEvents)
    return (
      <div className="flex flex-col md:flex-row justify-center items-center flex-1 ">
        {lectures?.error instanceof Error && <div>{lectures?.error.message}</div>}
        {lectures?.isLoading && <div>loading..</div>}
        <ClassSchedualer classes={classesEvents}/>
        
      </div>
          )
  
}


export default LevelClassPage
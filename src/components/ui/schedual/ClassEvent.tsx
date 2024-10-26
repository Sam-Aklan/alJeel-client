import { classesInterface } from '@/constants/events'
import { Book, TimerIcon } from 'lucide-react'
import moment from 'moment'

export const ClassEvent = ({event}:{event:classesInterface}) => {
    
    
    // console.log(moment(event.start?.toISOString().split('T')[1]).format("h:mm a"))
  return (
    <div className='flex flex-col  gap-2 w-full border-r-[6px] border-primary-color rounded-sm h-full py-8 bg-white border-y-2 border-x-4 justify-center '>
        <div className="flex gap-1 text-right">
            <div>
                <TimerIcon className='w-[20px]'/>
            </div>
                :
            <div className='text-sm'>
                <p>{moment(event.start).format("h:mm A")} —{" "}
                {moment(event.end).format("h:mm A")} </p>
          </div>
        </div>
        <div className="flex gap-1" dir="right">
            <div>
            <Book className='w-[20px]'/>
            </div>
                :
            <div>
                <p>{event.title}</p>
          </div>
        </div>
        
    </div>
  )
}

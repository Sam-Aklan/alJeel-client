
import { useLevels } from '@/api/level';
import {StudentForm} from '@/components/student/StudentForm'
import { XIcon } from 'lucide-react';

// const levels = [{id:"1",label:"djff"},{id:"2",label:"ghey"},{id:"3",label:"jfhfh"}]

export const StudentAddPage = () => {
  const levels= useLevels()
    if(levels?.data) console.log(levels.data)
    
  return (
    <div className='flex-1 flex justify-center items-center h-full'>
      {levels?.isLoading && (<div>loading ....</div>)}
      {levels.error instanceof Error && (<div className='flex gap-1 justify-center items-center'>
        <XIcon width={`15px`} height={`15px`} className='bg-danger text-[#fff] rounded-full'/>
      <p>
      {levels.error.message}
      </p>
        </div>)}
      {/* {levels?.data && JSON.stringify(levels?.data)} */}
        {levels.data &&<StudentForm levels={levels.data.levels}/>}
        {/* <div className='flex justify-center items-center h-full w-full'>

        <Select
        items={levels}
        variant="bordered"
        label="levels"
        placeholder="select a level"
        className="max-w-xs w-[200px]"
        >
          {(level) => <SelectItem key={level.id}>{level.label}</SelectItem>}
        </Select>
        </div> */}
    </div>
  )
}

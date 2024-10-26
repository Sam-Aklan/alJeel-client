import { useLevels } from "@/api/level"
import { Card, CardHeader } from "@nextui-org/react"
import { MdOutlineClass } from "react-icons/md"
import { Link } from "react-router-dom"


export const LevelsPage = () => {
    const levels= useLevels()
    if(levels?.data) console.log(levels.data)
    
  return (
    <div>
        {
            levels.isLoading && <div>loading....</div>
        }
        {
            levels.error instanceof Error && (
                <div>{levels.error.message}</div>
            )
        }{
            levels.isSuccess && (

                <div className="flex flex-col md:flex-row gap-2 w-full">
                    {levels?.data?.levels?.map((lvl:any)=>(
                        <Link to={`${lvl.id}`} key={lvl.id} className="w-full">
                        <Card className="py-4 w-full " dir="rtl">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <small className="text-default-500">المستوى الدراسي</small>
                            <MdOutlineClass/>
                            <h4 className="font-bold text-large">{lvl.levelName}</h4>
                            </CardHeader>
                        </Card>
                        </Link>
                    ))}
                
                    
                </div>
            )
        }
    </div>
  )
}

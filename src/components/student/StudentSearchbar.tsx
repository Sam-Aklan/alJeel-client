import { level } from '@/types/level'
import { studentsFiltersSchema } from '@/types/student/studentSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Dropdown, DropdownItem, DropdownMenu,DropdownTrigger, Input, Selection, SharedSelection } from '@nextui-org/react'
import { ChevronDownIcon, PlusIcon, SearchIcon} from 'lucide-react'
import { useCallback,useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormField } from '@/components/ui/form'
import { useStudentFilters } from './hooks/useStudentFilters'
import { Link } from 'react-router-dom'
interface searchBarProps{
    // filterValue:string,
    // onClear:()=>void,
    // onSearchChange:(search:string)=>void,
    // statusFilter:Selection,
    // setStatusFilter:(status:Selection)=>void,
    // visibleColumns:string[],
    // setVisibleColumns:()=>void,
    // columns:{name:string,key:string,sortable?:boolean}[],
    levels:level[],
    // onRowsPerPageChange:(row:ChangeEvent<HTMLSelectElement>)=>ChangeEventHandler<HTMLSelectElement>,
    studentCount:number,
    searchAndPaginate: ()=>void
}
export const StudentSearchbar = ({
    
    levels,
    
    // studentCount,
    // searchAndPaginate
}:searchBarProps) => {
  const {levelId,name,setFilters,deleteFilters}= useStudentFilters()
  const form = useForm<z.infer<typeof studentsFiltersSchema>>({
    resolver: zodResolver(studentsFiltersSchema),
    mode: "onBlur",
    defaultValues: {
      name: name,
      level:levelId
    },
  });
  const onClear = useCallback(()=>{
    form.setValue("name",'')
    form.setValue("name",undefined)
  },[])
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  // const selectedValue = useMemo(
  //   () => Array.from(selectedKeys).join(", ").replace("_"," "),
  //   [selectedKeys]
  // );
  const onSubmit = async(values: z.infer<typeof studentsFiltersSchema>) =>{
    console.log("search bar values: ",values)
    // console.log("selected keys:",...selectedKeys)
    // if(!values.name && !values.level) {
    //   toast.warning("لم تقم بادخال بيانات للبحث عنها")
    //   return
    // }
    // // if(!values.name)
    if(values.name || values.level) setFilters({page:1})
      if(!values.name) deleteFilters({name:undefined})
        if(!values.level) deleteFilters({levelId:undefined})
          setFilters({name:values.name})
          setFilters({levelId:values.level})
        // searchAndPaginate()
  }
  const handleSelection = (keys:SharedSelection)=>{
    setSelectedKeys(keys)
    // console.log("keys selections",keys["size"])
    // @ts-ignore
    if(keys["size"] === 0) {
      form.setValue("level",undefined)
      console.log("keys levels",form.getValues("level"))
      return
    }
    form.setValue("level",keys.currentKey)
    // return new Set([keys])
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>

    <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-3 items-end">
          <FormField
          control={form.control}
          name="name"
          render={(({field})=>(

          <Input
            isClearable
            className="md:w-[600px] sm:max-w-[44%]"
            placeholder="Search by name..."
            // startContent={<SearchIcon />}
            onClear={() => onClear()}
            onValueChange={field.onChange}
          />
          ))}/>
          <div className="flex gap-3">
            <FormField
            control={form.control}
            name='level'
            render={(()=>(

            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                 المستوى الدراسي
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                
                selectedKeys={selectedKeys}
                selectionMode="single"
                onSelectionChange={handleSelection}
              >
                {levels.map((level) => (
                  <DropdownItem key={level.id} className="">
                    {level.levelName}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            ))}/>
            <Button color="primary" endContent={<SearchIcon />} type='submit'>
              بحث
            </Button>
          </div>
          <div className='flex'>
          <Link to={`/students/add`}>
          <Button color='primary' variant='bordered' endContent={<PlusIcon />} className='mx-4 p-4' type='button'>
            اضافة طالب
          </Button>
          </Link>
          </div>
        </div>
      </div>
      </form>
    </Form>
    
  )
}

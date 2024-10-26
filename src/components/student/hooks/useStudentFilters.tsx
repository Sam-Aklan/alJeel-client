import { StudentFilters } from '@/types/student'
import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useStudentFilters = () => {
  const [searchParams,setSearchParams] = useSearchParams()
  const name = searchParams.get('name') ??undefined
  const levelId =searchParams.get('levelId')??undefined
  const page = searchParams.get('page')?parseInt(searchParams.get("page") as string):1
  const pageLimit = searchParams.get('pageLimit')?parseInt(searchParams.get("pageLimit") as string):5

  console.log("url params",name,"level:",levelId)
  const setFilters = useCallback(
    (filters:StudentFilters) => {
      console.log(filters)
      setSearchParams((params)=>{
        if (filters.name) {
            params.delete("name")
            params.set('name',filters.name)
        }
        // if(!filters.name){
        //   params.delete('name')
        // }
        if (filters.levelId) {
            params.delete("levelId")
            params.set("levelId",filters.levelId)
        }
        // if(!filters.level){
        //   params.delete("level")
        // }
        if (filters.page) {
            params.set("page",String(filters.page))
        }
        // if(!filters.page){
        //   params.delete("page")
        // }
        if (filters.pageLimit) {
            params.set("pageLimit",String(filters.pageLimit))
        }
        
        return params
      })
    },
    [],
  )

  const deleteFilters = useCallback((filters:StudentFilters)=>{
    setSearchParams((params)=>{
      if(!filters.name) params.delete("name")
      if(!filters.levelId) params.delete("levelId")
      return params
    })
  },[])
  
  return{
    name,
    levelId,
    setFilters,
    deleteFilters,
    pageLimit,
    page
  }
}

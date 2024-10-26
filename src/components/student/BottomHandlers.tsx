import { Button } from "@nextui-org/button";
import { Pagination } from "@nextui-org/pagination";
import { ChangeEvent, useCallback, useMemo,} from "react"
import { useStudentFilters } from "./hooks/useStudentFilters";

type paginationType = {
    isNext:boolean,
    prevouisPage:number,
    currentPage:number,
    pages:number,
    
}

const BottomHandlers = ({isNext,prevouisPage,currentPage,pages}:paginationType) => {
    
  const {page,pageLimit,setFilters} = useStudentFilters()
    // const [page, setPage] = useState(currentPage)
  const setPage = (page:number)=> setFilters({page:page})
  const setRowsPerPage = useCallback((event:ChangeEvent<HTMLSelectElement>)=> setFilters({pageLimit:Number(event.target.value)}),[pageLimit])
    const onNextPage =useCallback(() => {
        if (isNext) {
          setFilters({page:page + 1})
        }
      }, [page, pages]);
    
      const onPreviousPage = useCallback(() => {
        if (page > 1) {
          setFilters({page:page - 1})
        }
      }, [page]);
 const bottomContent = useMemo(()=>{
    return(
        <div className="py-2 px-2 flex justify-between items-center">
        {/* <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span> */}
        <div className="flex justify-between items-center">
          {/* <span className="text-default-400 text-small">Total {students.length} users</span> */}
          <label className="flex items-center text-default-400 text-small">
            عدد الصفوف:
            <select
              className="bg-transparent outline-none text-default-400 text-small max-w-100px"
              onChange={setRowsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page || currentPage}
          total={Math.ceil(pages/pageLimit)}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={!prevouisPage} size="sm" variant="flat" onPress={onPreviousPage}>
           السابق
          </Button>
          <Button isDisabled={!isNext} size="sm" variant="flat" onPress={onNextPage}>
            التالي
          </Button>
        </div>
      </div>
    )
 },[
  page,
  pages,
  isNext,
  prevouisPage
 ])
 return bottomContent
}

export default BottomHandlers
import { StudentPagePayload, studentNormalizeType } from '@/types/student'
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    User,
    Selection,
    SortDescriptor,
  } from "@nextui-org/react";
import {columns} from '@/constants/studentsColums'
import { DotsVerticalIcon, } from "@radix-ui/react-icons";
import { ChevronDownIcon, } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useStudentFilters } from './hooks/useStudentFilters';
import { Link } from 'react-router-dom';

const INITIAL_VISIBLE_COLUMNS = [
"الاسم",
"المستوى الدراسي",
"تاريخ الميلاد",
"العمليات"];

export const StudentTable = ({
  students,
    currentPage,
    levels,
    deleteStudent
  }:StudentPagePayload&{deleteStudent:(id:string,oldImage?:string)=>void}) => {
    // console.log(students.slice(1,2),levels.slice(1,2))
    // console.log(totalCount,isNext,prevouisPage,currentPage)
  
  const [filterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter] = useState<Selection>("all");
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const {pageLimit:rowsPerPage}= useStudentFilters()
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  // const [first, setfirst] = useState(second)
  const [page] = useState(currentPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(()=>{
    if(visibleColumns ==="all") {console.log("visible columns: ",visibleColumns)
      return columns
    }
    const returendCol = columns.filter((col)=> Array.from(visibleColumns).includes(col.name))
    console.log("returned columns",returendCol,"visiblecolumns:",Array.from(visibleColumns) )
    return columns.filter((col)=> Array.from(visibleColumns).includes(col.name))
  },[visibleColumns])
// console.log(`headerColumns: ${headerColumns}`)
  const filteredItems = useMemo(() => {
    let filteredUsers = [...students];

    // if (hasSearchFilter) {
    //   filteredUsers = filteredUsers.filter((user) =>
    //     user.name.includes(filterValue.toLowerCase()),
    //   );
    // }
    
    if (statusFilter !== "all" && Array.from(statusFilter).length !== levels.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.levelName),
      );
    }
    
    return filteredUsers;
  }, [students, filterValue, statusFilter]);
  console.log("fileterdItems",filteredItems)
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
  console.log("items:",items)
  const sortedItems = useMemo(() => {
    return [...items].sort((a:  studentNormalizeType, b:  studentNormalizeType) => {
      const first = a[sortDescriptor.column as keyof studentNormalizeType] as string| Date ;
      const second = b[sortDescriptor.column as keyof studentNormalizeType] as string| Date ;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((student: studentNormalizeType, columnKey: React.Key) => {
    const cellValue = student[columnKey as keyof studentNormalizeType];
    
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "lg", src:  student.imagePath?student.imagePath:''}}
            name={cellValue?.toString()}
          >
            {cellValue?.toString()}
          </User>
        );
      case "levelName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{student.levelName}</p>
          </div>
        );
      case"dateOfBirth":
        return(
            <div className="flex flex-col">
            {/* <p className="text-bold text-small ">{cellValue?.toString()}</p> */}
            <p className="text-bold text-small">{student.dateOfBirth.toISOString().split('T')[0]}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <DotsVerticalIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>عرض</DropdownItem>
                <DropdownItem>
                <Link to={`${student.id}`}>
                  تعديل
                </Link>
                  </DropdownItem>
                
                <DropdownItem onClick={()=>student?.imagePath? deleteStudent(student.id,student.imagePath):deleteStudent(student.id)}>حذف</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  

  // const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setRowsPerPage(Number(e.target.value));
  //   setPage(1);
  // }, []);

  // const onSearchChange = useCallback((value?: string) => {
  //   if (value) {
  //     setFilterValue(value);
  //     setFilters({name:value})
  //     setPage(1);
  //   } else {
  //     setFilterValue("");
  //   }
  // }, []);

  
  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          
          <div className="flex">
            
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  الاعمدة
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.name} className="">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            
          </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">عدد الطلاب {students.length}</span>
        </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    // onSearchChange,
    students.length,
    hasSearchFilter,
  ]);

  // const bottomContent = useMemo(() => {
  //   return (
  //     <div className="py-2 px-2 flex justify-between items-center">
  //       <span className="w-[30%] text-small text-default-400">
  //         {selectedKeys === "all"
  //           ? "All items selected"
  //           : `${selectedKeys.size} of ${filteredItems.length} selected`}
  //       </span>
  //       <Pagination
  //         isCompact
  //         showControls
  //         showShadow
  //         color="primary"
  //         page={page}
  //         total={pages}
  //         onChange={setPage}
  //       />
  //       <div className="hidden sm:flex w-[30%] justify-end gap-2">
  //         <Button isDisabled={!prevouisPage} size="sm" variant="flat" onPress={onPreviousPage}>
  //           Previous
  //         </Button>
  //         <Button isDisabled={!isNext} size="sm" variant="flat" onPress={onNextPage}>
  //           Next
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }, [selectedKeys, items.length, page, pages, hasSearchFilter]);
  console.log("table component: ",headerColumns)
  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader>
  {headerColumns && headerColumns.length > 0 ? (
    headerColumns.map((column) => (
      <TableColumn
        key={column.key}
        align={column.key === "actions" ? "center" : "start"}
        allowsSorting={column.sortable}
      >
        {column.name}
      </TableColumn>
    ))
  ) : (
    <TableColumn>Not found</TableColumn>
  )}
</TableHeader>
      <TableBody emptyContent={"لا توجد نتائج"} items={sortedItems} >
        {(item) => (
          <TableRow key={item.id} >
            {(columnKey) => <TableCell >{renderCell(item, columnKey) as string}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

import { TeacherPayload } from "@/types/teacher";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Selection, SortDescriptor, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { ChevronDownIcon, DeleteIcon, EditIcon, EyeIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { columns } from "./teacherColumn";
import { Link } from "react-router-dom";
import { useDeleteTeacher } from "@/api/teacher";

const INITIAL_VISIBLE_COLUMNS = [
    "الاسم",
    "التخصص",
    "العمليات"];
const TeacherTable = ({teacherPayload,specOptions}:{teacherPayload:TeacherPayload[],specOptions?:string[]}) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [filterValue, setFilterValue] = useState("");
  const [hasSearchFilter,setHasSearchFilter] = useState<Boolean>(false);
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "teacherName",
    direction: "ascending",
  });

  const pages = useMemo(()=>Math.ceil(teacherPayload.length / rowsPerPage),[rowsPerPage]);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("rows per pages: ", e.target.value)
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const deleteTeacher = useDeleteTeacher()

  const filteredItems = useMemo(() => {
    let filteredTeachers = [...teacherPayload];

    if (hasSearchFilter) {
      filteredTeachers = filteredTeachers.filter((user) =>
        user.teacherName.includes(filterValue),
      );
    }
    if (statusFilter !== "all" && specOptions&& Array.from(statusFilter).length !== specOptions.length) {
      filteredTeachers = filteredTeachers.filter((user) =>
        Array.from(statusFilter).includes(user.specialization),
      );
    }

    return filteredTeachers;
  }, [teacherPayload, filterValue, statusFilter]);


  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems,rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: TeacherPayload, b: TeacherPayload) => {
      const first = a[sortDescriptor.column as keyof TeacherPayload] as string;
      const second = b[sortDescriptor.column as keyof TeacherPayload] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

    const renderCell = useCallback((teacher: TeacherPayload, columnKey: React.Key) => {
        const cellValue = teacher[columnKey as keyof TeacherPayload];
    
        switch (columnKey) {
          case "teacherName":
            return (
                <div className="flex flex-col">
                <p className="text-bold text-small ">{cellValue}</p>
              </div>
            );
          case "specialization":
            return (
              <div className="flex flex-col">
                {/* <p className="text-bold text-sm capitalize">{cellValue}</p> */}
                <p className="text-bold text-sm capitalize text-default-400">{cellValue}</p>
              </div>
            );
          
          case "actions":
            return (
              <div className="relative flex items-center gap-2">
                
                <Tooltip content="Edit teacher">
                  <Link to={`/teacher/${teacher.id}`}>
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon />
                  </span>
                  </Link>
                </Tooltip>
                <Tooltip color="danger" content="Delete teacher">
                  <span 
                  onClick={async()=>{
                    await deleteTeacher.mutateAsync(teacher.id)
                    
                  }}
                  className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                  </span>
                </Tooltip>
              </div>
            );
          default:
            return cellValue;
        }
      }, [])

      const onSearchChange = useCallback((value?: string) => {
        if (value) {
          setFilterValue(value);
          setHasSearchFilter(true)
          setPage(1);
        } else {
          setFilterValue("");
          setHasSearchFilter(false)
        }
      }, []);

      const onClear = useCallback(()=>{
        setFilterValue("")
        setPage(1)
      },[])

      const topContent = useMemo(() => {
        return (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
              <Input
                isClearable
                className="w-full sm:max-w-[44%]"
                placeholder="Search by name..."
                startContent={<SearchIcon />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
              <div className="flex gap-3">
                <Dropdown>
                  <DropdownTrigger className="hidden sm:flex">
                    <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                      التخصص
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={statusFilter}
                    selectionMode="multiple"
                    onSelectionChange={setStatusFilter}
                  >
                    {specOptions?specOptions.map((status) => (
                      <DropdownItem key={status} className="capitalize">
                        {status}
                      </DropdownItem>
                    )):<></>}
                  </DropdownMenu>
                </Dropdown>
                <Link to='/teachers/add'>
                <Button color="primary" endContent={<PlusIcon />}
                variant="bordered">
                  اضافة استاذ/ة
                </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-default-400 text-small">Total {teacherPayload.length} users</span>
              <label className="flex items-center text-default-400 text-small">
                Rows per page:
                <select
                  className="bg-transparent outline-none text-default-400 text-small"
                  onChange={onRowsPerPageChange}
                >
                  <option value="3">3</option>
                  <option value="6">6</option>
                  <option value="9">9</option>
                </select>
              </label>
            </div>
          </div>
        );
      }, [
        filterValue,
        statusFilter,
        onSearchChange,
        onRowsPerPageChange,
        teacherPayload.length,
        hasSearchFilter,
      ]);

      const bottomContent = useMemo(()=>
        {
            return (
                <div className="py-2 px-2 flex justify-between items-center">
                  <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                      ? "All items selected"
                      : `${selectedKeys.size} of ${filteredItems.length} selected`}
                  </span>
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                  />
                  <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                      السابق
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                     التالي
                    </Button>
                  </div>
                </div>
              );
        },[selectedKeys,items.length,page,pages,hasSearchFilter])
  return (
    <Table aria-label="Example table with custom cells"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys} 
      onSortChange={setSortDescriptor}
      classNames={{
        wrapper: "max-h-[382px]",
      }}>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} align={ "start"}
          allowsSorting={column.sortable}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default TeacherTable
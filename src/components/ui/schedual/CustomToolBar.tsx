import  { ReactNode, useState, } from "react";
import { BsChevronLeft, BsChevronRight, } from "react-icons/bs";
import './CustomToolBar.css'
import { ToolbarProps, View } from "react-big-calendar";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
interface toolbarPropsExtended extends ToolbarProps{
  labelFormat:ReactNode;
  isMobile:boolean
}

const CustomToolBar = (
    { label, onNavigate, view, onView, isMobile, labelFormat}:toolbarPropsExtended
) => {
  console.log(view)
  const views = [{
      value:"month",
      label:"شهر"},
       {
      value:"week",
      label:"اسبوع"
  }, 
       {
      value:"work_week",
      label:"ايام العمل"
  }, 
  {
      value:"day",
      label:"يوم"},
       {
      value:"agenda",
      label:"الاجندة"}
  ];

  // const days = ["الاحد","الاثنين","الثلاثاء","الاربعاء","الخميس","الجمعة","السبت"];
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(view as string)
  const handleViewChange = (currentValue:string) => {
    setValue(currentValue === value ? "" : currentValue)
    if (currentValue!=="") {
      onView(currentValue as View)
    }
    setOpen(false)
  }
  const goToToday = () => {
    const now = new Date();
    onNavigate('TODAY', now);
  };
console.log("toolbar: ",isMobile)
  return (
    <div>
        {isMobile ? (
          <div className="flex justify-around items-center">

          <span className="flex justify-center items-center" >
            <Button 
            onClick={() => onNavigate("PREV")} 
            variant="light"
            className="navigatePrev text-primary-color text-xl">
              <BsChevronLeft />
            </Button>

            <span className=" flex justify-center items-center text-primary-color">
                {view == 'month' || view == 'week' || view == 'day' ? labelFormat: label}
            </span>
            {/* </div> */}
            <Button 
            onClick={() => onNavigate("NEXT")} 
            className="navigateNext text-primary-color text-xl"
            variant='light'>
              <BsChevronRight />
            </Button>
            
            </span>
            <Select
            items={views}
            selectedKeys={["month"]}
            className="w-1/4"
            onSelectionChange={({currentKey})=>currentKey?handleViewChange(currentKey):null}
            classNames={
              {
                
                trigger:"bg-white text-primary",
              }
            }>
              {(view)=><SelectItem key={view.value}>
                {view.label}
                </SelectItem>}
            </Select>
          </div>
             
        ) : (
          <span className="flex justify-between items-center p-4">
            <div className="flex gap-6 flex-1">
            <div className="flex gap-2">
            <Button onClick={goToToday} 
            color="primary"
            className="navigateToday text-white">اليوم
            </Button>

            <div className="flex gap-1">
            <Button variant="light" onClick={() => onNavigate("PREV")} className="navigatePrev text-primary-color text-xl"><BsChevronLeft />
            </Button>
            <Button variant="light" onClick={() => onNavigate("NEXT")} className="navigateNext text-primary-color text-xl"><BsChevronRight />
            </Button>
            </div>
              
            </div>

            <span className="text-primary-color font-normal">{label}</span>
            </div>
              
            <Select
            items={views}
            defaultSelectedKeys={["week"]}
            className="w-1/6"
            onSelectionChange={({currentKey})=>currentKey?handleViewChange(currentKey):null}
            classNames={
              {
                trigger:"bg-white text-primary",
              }
            }>
              {(view)=><SelectItem key={view.value}>
                {view.label}
                </SelectItem>}
            </Select>
              
          </span>
        )}

        
    </div>
  )
}

export default CustomToolBar
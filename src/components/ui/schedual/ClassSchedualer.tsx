import {Calendar,SlotInfo}from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'moment/dist/locale/ar-sa'
import {classesInterface,} from "@/constants/events";
import {useEffect, useMemo, useState } from "react";
import moment from "moment";
import { ClassForm } from './ClassModal';
import CustomToolBar from './CustomToolBar';
import CustomHeader from './CustomHeader';
import { CustomAgendaHeader, CustomAgendaToolbar, CustomEvent } from './CustomAgenda';
import './ClassSchedualer.css'
import SimpleModal from './SimpleModal';
import { arabicLocalizer } from '@/config/moment';
import { ClassEvent } from './ClassEvent';
import { cn } from '@/lib/utils';




const ClassSchedualer = ({classes}:{classes:classesInterface[]|undefined}) => {
  
     const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
      const [selectedEvent, setSelectedEvent] = useState<classesInterface|null>(null);
      const [showForm, setShowForm] = useState(false);
      const [selectedDate, setSelectedDate] = useState(classes?.length?classes[0].start:new Date()); // Added state for selected date
      const [showAllclassEvents, setShowAllclassEvents] = useState(false);
    
      useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
      const handleSelectEvent = (
        event:classesInterface,
        // e: React.SyntheticEvent<HTMLElement>
      ):void => {
        // console.log(event);
        setSelectedEvent(event);
        if (!isMobile) {
          setShowForm(true);
        }
      };
    
      
      const handleSelectSlot = (slotInfo:SlotInfo):void => {
        // slotInfo contains start and end date of the clicked slot
        const newEvent = {
          start: slotInfo.start,
          end: slotInfo.end,
          title: "", // Empty title, user will input
           // Default to 'appointment' or make dynamic as needed
        };
        setSelectedEvent(newEvent); // Set as selected event to fill the form
        setShowForm(true); // Show the form
      };
    // console.log(moment(classes[0]?.start).isSame(classes[7]?.start,'day'))
      const handleDrillDown = (date:Date) => {
        // If mobile, prevent default behavior
        if (isMobile) {
          
          setSelectedDate(date);

          // setShowAllclassEvents(true);
          // SimpleModal()
        } else {
        }
      };
    
     
      const filteredEventsForSelectedDate = useMemo(()=>{
        console.log("filted classes: ", classes)
        // return classes
        if(showAllclassEvents) return classes
        console.log(selectedDate)
         const s =  classes?.filter(
              (event) =>
                moment(event.start).isSame(selectedDate,'day') ||
                moment(event.end).isSame(selectedDate, "day")
            );
            console.log("filterd classes",s)
            return s
      },[classes,selectedDate,showAllclassEvents]) 

      console.log("filtered classes: ", filteredEventsForSelectedDate)
    
      const toggleShowAllEvents = () => {
        setShowAllclassEvents(pre=> !pre);
        console.log("show all classes",showAllclassEvents)
      };
    
      const eventStyleGetter = ({event,isMobile}:{event:classesInterface, isMobile:boolean}) => {
        let backgroundColor = event.color || "#FFE4C8"; // Default color if none is specified
        let borderLeftColor = "4px solid  #4361ee"; // Check if type is appointment
        
        let style = {
          backgroundColor: backgroundColor,
          color: isColorBright(backgroundColor) ? "#0F4C81" : "#5684AE",
          border: "1px solid ",
          borderRight: borderLeftColor,
          width:"100%",
          height:"100%",
          TextWrap:"wrap",
          // borderRadius:"7px"

        };
        let className = "";
    
        if (isMobile) {
          className = "mobileView";
          style.borderRight ="8px solid #4361ee";
        }
    
        return {
          style: style,
          className: className,
        };
      };
    
      const isColorBright = (hex:string) => {
        if (hex.indexOf("#") === 0) {
          hex = hex.slice(1);
        }
        // Convert hex to RGB
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
    
        // Using the luminance formula to find brightness
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5; // Bright colors will have luminance greater than 0.5
      };
    
      // CustomDay.js
      // const CustomDay = ({date}:HeaderProps) => {
      //   // console.log(moment(date).format("ddd"))
      //   return <div className="custom-day">{moment(date).format("dddd")}</div>;
      // };

  return (
    <div className={cn('h-screen w-full ',
      isMobile?'flex flex-col justify-center items-center h-1/3':''
    )}>
      <SimpleModal isOpen={showForm}
      onClose={()=>{
        setShowForm(false)}}>
      <ClassForm eventDetails={selectedEvent} onSave={()=>{}} onCancel={()=>setShowForm(false)} />
      </SimpleModal>
        
      <Calendar  localizer={arabicLocalizer}
      defaultView={isMobile?'month':'week'}
      views={['month','week','work_week','day']}
      toolbar={true}
      events={classes}
      onNavigate={(newDate)=>setSelectedDate(newDate)}
      startAccessor={'start'}
      endAccessor={'end'}
      className='flex flex-col justify-center items-center flex-1  min-h-full text-wrap '
      popup={true}
      popupOffset={{x:2,y:2}}
      date={selectedDate}
      defaultDate={selectedDate}
      selectable={true}
      onSelectSlot={handleSelectSlot}
      onSelectEvent={handleSelectEvent}
      eventPropGetter={(event:classesInterface)=>eventStyleGetter({event,isMobile})}
      onDrillDown={handleDrillDown}
      components={
        {
          
        toolbar:(props)=>(
          <CustomToolBar
          {...props}
          isMobile={isMobile}
          labelFormat={<CustomHeader {...props} isMobile={isMobile} localizer={arabicLocalizer}/>}
        />
        ),
        
        week:{
          
          event: (classEvent)=>(
            <ClassEvent event={classEvent.event}/>
          ),
        }
      }}
      messages={{
        week: "اسبوع",
          day: "يوم",
          month: "شهر",
          // previous: <BiSolidChevronLeft />,
          previous: "السابق",
          // next: <BiSolidChevronRight />,
          next: "التالي",
          today: "اليوم",
          agenda: "الاجندة",
          showMore:(total)=> `show +${total} more`
          
      }}
      
      style={isMobile?{
        height: "auto", maxHeight: "50vh"
      }:{
        height: "100%", minHeight: "50vh"
      }}
      min={new Date (0,0,0,8,0,0)}
      max={new Date(0,0,0,14,0,0)}/>
      {isMobile && (
        <>
        
          <Calendar
          className="agenda-calendar flex flex-col gap-2"
          defaultView="agenda"
          localizer={arabicLocalizer}
          date={classes?classes[0]?.start:undefined}
          onDrillDown={handleDrillDown}
          components={{
            agenda: {
              event:(e)=> <CustomEvent start={e.event.start}
              end={e.event.end}
              title={e.event.title}/>,

            },
            header:CustomAgendaHeader,
            toolbar: (prop) => (
              <CustomAgendaToolbar
                onViewAllClick={toggleShowAllEvents}
                eventsDate={selectedDate}
                {...prop}
              />
            ),
          
        }
        }
          events={filteredEventsForSelectedDate}
          // toolbar={false} // Disable the toolbar for this view
          style={{ height: "55vh", padding: "12px" }} // Adjust height accordingly
          messages={{
            noEventsInRange:"لا توجد اي محاضرات خلال هذه الفترة"
          }}
        />
        </>
      )}
    </div>
  );
  
}

export default ClassSchedualer

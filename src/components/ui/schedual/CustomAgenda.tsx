import moment from "moment";

import { classesInterface } from "@/constants/events";
import './customAgenda.css'

// CustomAgendaHeader
export const CustomAgendaHeader = () => {
  return (
    <div className="custom-agenda-header">
      <h2>Upcoming Events</h2>
      <button className="view-all-button">View All</button>
    </div>
  );
};

// CustomDateHeader
// export const CustomDateHeader = ({label}:{ label:string }) => {
//   //   return <div className="custom-date-header">{label}</div>;
// };

// CustomEvent
export const CustomEvent = ({start,end,title}:classesInterface) => {
  const videoCall = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
  }
  

  // const viewProfile = (
  //   e:React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   console.log('view, ',event)
  // }
 
  return (
    <div className={"custom-event overflow-x-hidden bg-white rounded-md border-r-4 border-r-primary " + "event"}>
      <div className="event-details">
        <h3>{title}</h3>
        <div className="event-time">
          {moment(start).format("h:mm A")} —{" "}
          
          {moment(end).format("h:mm A")} 
        </div>
        {"event"!== "event" && (<div className="event-bottom">
            <div className="event-avatar"></div>
            <button className="event-action-button" >View Client Profile</button>
        </div>)}
      </div>
      <div className="video" onClick={videoCall}>{"event" !== "event" }
        
      </div>
    </div>
  );
};

// CustomAgendaToolbar
interface CustomAgendaToolbar{
    onViewAllClick:(event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void,
    
}
export const CustomAgendaToolbar = ({onViewAllClick, eventsDate}:CustomAgendaToolbar&{eventsDate:Date}) => {
  // console.log("moble events",events.children)
    
    return (
        <div className="custom-agenda-header flex justify-around items-center w-full">
            <div className="flex gap-2 justify-center items-center">
              
                {/* <h2>مواعيد هذ اليوم</h2> */}
                <h4> {moment(eventsDate).format("D")} {moment(eventsDate).format("MMM")}</h4>
            </div>
            <button className="view-all-button " onClick={onViewAllClick}>
              عرض الكل
            </button>
        </div>
    );
};


import { Event } from "react-big-calendar";
export interface classesInterface extends Event{
  id?:string;
  color?:string;
  lectureTimeId?:string;
  courseId?:number;
  start:Date,
  end:Date,
  
}
export interface classesAction extends classesInterface{
  mode?:string
}

// export const classes:classesInterface[]= [
  
//   {
//     id: 1,
//     title: "Client Meeting",
//     start: new Date(today.setHours(10, 0, 0, 0)), // Today at 10:00 AM
//     end: new Date(today.setHours(11, 0, 0, 0)), // Today at 11:00 AM
//     type: "appointment",
//     clientName: "Johan Le",
//     description: "Meeting daily",
//     color: "#FFE4C8",
//   },
//   {
//     id: 2,
//     title: "Webinar: How to make webinar on React",
//     start: new Date(tomorrow.setHours(15, 0, 0, 0)), // Tomorrow at 3:00 PM
//     end: new Date(tomorrow.setHours(16, 0, 0, 0)), // Tomorrow at 4:00 PM
//     type: "event",
//     eventUrl: "https://example.com/webinar",
//     color: "#F9BE81",
//   },
//   {
//     id: 3,
//     title: "Interview with Johan Le",
//     start: new Date(totomorrow.setHours(9, 0, 0, 0)),
//     end: new Date(totomorrow.setHours(9, 30, 0, 0)),
//     type: "appointment",
//     clientName: "Johan Le",
//     description: "Meeting daily",
//     color: "#FFE4C8",
//   }
// ]
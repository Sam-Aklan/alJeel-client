import moment from "moment"
import { momentLocalizer } from "react-big-calendar"
// import moment from 'moment-business-days'
moment.updateLocale("ar-sa",
    {
      relativeTime:{
        future: "خلال %s",
          past:   "%s قبل",
          s  : 'a few seconds',
          ss : '%d seconds',
          m:  "دقيقة",
          mm: "%d دقائق",
          h:  "ساعة",
          hh: "%d ساعات",
          d:  "يوم",
          dd: "%d ايام",
          w:  "اسبوع",
          ww: "%d اسابيع",
          M:  "شهر",
          MM: "%d اشهر",
          y:  "سنة",
          yy: "%d سنين"
      },
      longDateFormat : {
        LT: "h:mm A",
        LTS: "h:mm:ss A",
        L: "MM/DD/YYYY",
        LL: "MMMM Do YYYY",
        LLL: "MMMM Do YYYY LT",
        LLLL: "dddd, MMMM Do YYYY LT"
    },
    // workingWeekdays:[0,1,2,3,4,5]
    }
  )
  
  export const arabicLocalizer = momentLocalizer(moment)
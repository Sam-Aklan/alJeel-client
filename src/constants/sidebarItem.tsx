import { SideNavItem } from "@/types/sidebarItem";
import { MdOutlineGrade } from "react-icons/md";
import { PiChalkboardTeacherThin, PiStudentLight } from "react-icons/pi";
import { RiBookLine } from "react-icons/ri";
// const ICON_WIDTH =
export const SIDBAR_ITEMS: SideNavItem[] = [
        {
          title: 'الاساتذة',
          path: '/teachers',
          icon: <PiChalkboardTeacherThin width={30} height={30} />,
        },
        {
          title: 'الطلاب',
          path: '/students',
          icon: <PiStudentLight width="24" height="24" />,
          submenu: true,
          subMenuItems: [
            { title: 'All', path: '/students' },
            { title: 'Web Design', path: '/students/web-design' },
            { title: 'Graphic Design', path: '/students/graphic-design' },
          ],
        },
        {
          title: 'المناهج الدراسية',
          path: '/courses',
          icon: <RiBookLine width="24" height="24"/>,
        },
        {
          title: 'المستويات الدراسية',
          path: '/levels',
          icon: <MdOutlineGrade width="24" height="24"/>,
          submenu: true,
          subMenuItems: [
            { title: 'Account', path: '/settings/account' },
            { title: 'Privacy', path: '/settings/privacy' },
          ],
        },
        
      ];
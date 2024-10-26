import { LayoutGrid, Settings, Users } from "lucide-react";
import { ReactNode } from "react";
import { FaRegUser} from "react-icons/fa";
import { MdOutlineGrade } from "react-icons/md";
import { PiChalkboardTeacherThin } from "react-icons/pi";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: ReactNode
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};
type menuListProps ={
  pathname:string
  iconSize:number
}

export function getMenuList({pathname,iconSize}: menuListProps): Group[] {
    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/",
            label: "لوحة التحكم",
            active: pathname ==="/",
            icon: <LayoutGrid size={iconSize}/>,
            submenus: []
          }
        ]
      },
      {
        groupLabel: "القائمة الرئسية",
        menus: [
          {
            href: "",
            label: "المستويات الدراسية",
            active: pathname.includes("/levels"),
            icon:<MdOutlineGrade size={iconSize}/> ,
            submenus:[
              {
                active:pathname.includes("/levels"),
                label:"الجداول",
                href:"/levels"
              },
              {
                active:pathname.includes('levels/students'),
                label:"طلاب القسم",
                href:"/levels/students"
              }
            ]
          },
          {
            href: "/teachers",
            label: "الاساتذة",
            active: pathname.includes("/teachers"),
            icon: <PiChalkboardTeacherThin size={iconSize}/>,
            submenus: []
          },
          {
            href: "/students",
            label: "الطلاب",
            active: pathname.includes("/students"),
            icon: <FaRegUser size={iconSize}/>,
            submenus: []
          }
        ]
      },
      {
        groupLabel: "الاعدادات",
        menus: [
          {
            href: "/users",
            label: "المستخدمون",
            active: pathname.includes("/users"),
            icon: <Users size={iconSize}/>,
            submenus: []
          },
          {
            href: "/account",
            label: "الحساب",
            active: pathname.includes("/account"),
            icon: <Settings size={iconSize}/>,
            submenus: []
          }
        ]
      }
    ];
  }